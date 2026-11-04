import os, socket, hashlib, base64, sys, stat, posixpath, pathlib, io, time


def log(message):
    print(time.strftime("%H:%M:%S", time.gmtime()) + " " + message, flush=True)

def download(sftp, path):
    output = io.BytesIO()
    sftp.getfo(path, output, prefetch=True, max_concurrent_prefetch_requests=32)
    return output.getvalue()

def merge_cache_rules(previous, current):
    start, end = b"# BEGIN REVOLIS CACHE", b"# END REVOLIS CACHE"
    if start in previous:
        if previous.count(start) != 1 or previous.count(end) != 1:
            raise ValueError("Invalid managed cache block")
        a, b = previous.index(start), previous.index(end) + len(end)
        if b < a: raise ValueError("Invalid managed cache block")
        previous = previous[:a] + previous[b:]
    elif end in previous:
        raise ValueError("Invalid managed cache block")
    return previous.rstrip() + b"\n\n" + current if previous.strip() else current


def publish(sftp, root, backup, token, files):
    def exists(path):
        try:
            return sftp.lstat(path)
        except FileNotFoundError:
            return None
    def mkdirs(path):
        info = exists(path)
        if info:
            if not stat.S_ISDIR(info.st_mode):
                raise ValueError("Non-directory or symlink")
            return
        mkdirs(posixpath.dirname(path))
        sftp.mkdir(path, mode=0o700 if path.startswith(backup) else 0o755)
    mkdirs(backup)
    staged = []
    skipped = 0
    stage = "backup and staging"
    for index, local in enumerate(files, 1):
        rel = local.relative_to("dist").as_posix()
        log(f"COMPARE {index}/{len(files)} {rel}")
        target = posixpath.join(root, rel)
        mkdirs(posixpath.dirname(target))
        info = exists(target)
        if info and not stat.S_ISREG(info.st_mode):
            raise ValueError("Destination is not a regular file")
        previous = download(sftp, target) if info else None
        content = local.read_bytes()
        if rel == ".htaccess" and previous is not None:
            content = merge_cache_rules(previous, content)
        expected = hashlib.sha256(content).digest()
        if previous is not None and hashlib.sha256(previous).digest() == expected:
            skipped += 1
            log(f"UNCHANGED {rel}")
            continue
        if info:
            log(f"BACKUP {rel}")
            saved = posixpath.join(backup, rel)
            mkdirs(posixpath.dirname(saved))
            sftp.putfo(io.BytesIO(previous), saved, file_size=len(previous), confirm=True)
            if hashlib.sha256(download(sftp, saved)).digest() != hashlib.sha256(previous).digest():
                raise ValueError("Backup hash mismatch")
        temporary = target + ".upload-" + token
        log(f"UPLOAD {rel} bytes={len(content)}")
        sftp.putfo(io.BytesIO(content), temporary, file_size=len(content), confirm=True)
        sftp.chmod(temporary, 0o644)
        log(f"VERIFY {rel}")
        if hashlib.sha256(download(sftp, temporary)).digest() != expected:
            raise ValueError("Upload hash mismatch")
        staged.append((temporary, target, rel, bool(info)))
    log(f"STAGED changed={len(staged)} unchanged={skipped}")
    stage = "activation"
    activated = []
    try:
        for temporary, target, rel, had_previous in sorted(staged, key=lambda item: item[2].endswith(".html")):
            log(f"ACTIVATE {rel}")
            sftp.posix_rename(temporary, target)
            activated.append((target, rel, had_previous))
    except Exception:
        for target, rel, had_previous in reversed(activated):
            if had_previous:
                sftp.posix_rename(posixpath.join(backup, rel), target)
            else:
                sftp.remove(target)
        raise
    stage = "retire component libraries"
    # Older releases uploaded these routes. Removing them from dist alone
    # would leave the old copies online; move only these two directories
    # to the existing backup outside the site's document root.
    for name in ("ui-kit", "ui-kit-mobile"):
        obsolete = posixpath.join(root, name)
        info = exists(obsolete)
        if info:
            if not stat.S_ISDIR(info.st_mode):
                raise ValueError("Unexpected UI Kit destination type")
            sftp.posix_rename(obsolete, posixpath.join(backup, "retired-" + name))
        if exists(obsolete):
            raise ValueError("UI Kit route remains on host")
    return len(staged), skipped

def main():
    import paramiko
    transport = None
    stage = "configuration"
    try:
        host, user, password, directory = [os.environ[n] for n in ("FTP_SERVER", "FTP_USERNAME", "FTP_PASSWORD", "FTP_SERVER_DIR")]
        if not all((host, user, password, directory)):
            raise ValueError("Missing configuration")
        files = sorted(p for p in pathlib.Path("dist").rglob("*") if p.is_file())
        if not pathlib.Path("dist/index.html").is_file() or not files:
            raise ValueError("Missing build")
        stage = "SSH and pinned key"
        log("CONNECT: SSH with pinned host key")
        transport = paramiko.Transport(socket.create_connection((host, 22), timeout=30))
        transport.get_security_options().key_types = ("ssh-ed25519",)
        transport.start_client(timeout=30)
        fp = "SHA256:" + base64.b64encode(hashlib.sha256(transport.get_remote_server_key().asbytes()).digest()).decode().rstrip("=")
        if fp != "SHA256:Yk1d+cp6318Dso8AHTwoCStX/iHcxGRXMSntQ++OSK4":
            raise ValueError("Host key mismatch")
        transport.auth_timeout = 30
        stage = "authentication"
        log("AUTHENTICATE")
        transport.auth_password(user, password)
        transport.set_keepalive(15)
        log("OPEN SFTP")
        sftp = paramiko.SFTPClient.from_transport(transport)
        sftp.get_channel().settimeout(60)
        home = sftp.normalize(".")
        root = sftp.normalize(directory)
        if root != sftp.normalize("www/revolis.by") or root in (home, "/"):
            raise ValueError("Unexpected destination")
        token = os.environ["GITHUB_RUN_ID"] + "-" + os.environ["GITHUB_RUN_ATTEMPT"]
        backup = posixpath.join(home, "revolis-deploy-backups", token)
        stage = "publish (see last progress line)"
        log(f"CONNECTED files={len(files)}")
        changed, skipped = publish(sftp, root, backup, token, files)
        print("PASS: Published master " + os.environ["GITHUB_SHA"] + "; all uploaded file hashes verified.", flush=True)
        print("BACKUP: Home-relative revolis-deploy-backups/" + token, flush=True)
        print("Existing unrelated files retained.", flush=True)
    except Exception as error:
        print("FAIL: " + stage + "; " + type(error).__name__ + ". Details hidden.", flush=True)
        sys.exit(1)
    finally:
        if transport: transport.close()


if __name__ == "__main__":
    main()
