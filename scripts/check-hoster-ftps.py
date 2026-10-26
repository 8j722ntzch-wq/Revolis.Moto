"""Read-only explicit FTPS check. Never print credentials or server responses."""
import ftplib
import os
import socket
import ssl
import sys


def report(message):
    print(message, flush=True)
    summary = os.environ.get('GITHUB_STEP_SUMMARY')
    if summary:
        with open(summary, 'a', encoding='utf-8') as output:
            output.write(message + '\n\n')


def main():
    names = ('FTP_SERVER', 'FTP_USERNAME', 'FTP_PASSWORD', 'FTP_SERVER_DIR')
    missing = [name for name in names if not os.environ.get(name)]
    if missing:
        report('FAIL: Missing secrets: ' + ', '.join(missing))
        return 1
    report('PASS: All four secrets are present (values are not logged).')
    host, user, password, directory = (os.environ[name] for name in names)
    if any('\r' in value or '\n' in value for value in (host, user, password, directory)):
        report('FAIL: A secret contains a newline; remove accidental line breaks.')
        return 1
    if not directory.endswith('/'):
        report('WARNING: FTP_SERVER_DIR needs a trailing / before deployment. Directory access will still be checked.')
    client = ftplib.FTP_TLS(context=ssl.create_default_context(), timeout=25)
    stage = 'TCP connection to port 21'
    try:
        client.connect(host, 21)
        report('PASS: FTP server is reachable on port 21.')
        stage = 'TLS certificate verification'
        client.auth()
        report('PASS: TLS certificate is trusted and matches FTP_SERVER.')
        stage = 'FTP login'
        client.login(user, password)
        report('PASS: FTP credentials accepted.')
        stage = 'encrypted data channel setup'
        client.prot_p()
        stage = 'configured directory access'
        client.cwd(directory)
        report('PASS: FTP_SERVER_DIR exists and is accessible.')
        stage = 'passive encrypted directory listing'
        client.retrlines('LIST', lambda line: None)
        report('PASS: Encrypted passive directory listing completed; filenames are not logged.')
        report('No files were uploaded, modified or deleted. Write permission and website document-root mapping were not tested.')
        return 0 if directory.endswith('/') else 1
    except ssl.SSLCertVerificationError as error:
        reason = 'hostname/IP mismatch' if getattr(error, 'verify_code', None) in (62, 64) else 'certificate trust, validity or chain error'
        report('FAIL: TLS verification: ' + reason + '. Use the provider-confirmed FTP hostname/certificate. Login and directory checks were not completed if this occurred before login.')
    except ftplib.error_perm as error:
        code = str(error)[:3]
        code = code if code.isdigit() else 'unknown'
        report('FAIL: ' + stage + '; FTP response code ' + code + '. Server response text is hidden.')
    except (socket.timeout, TimeoutError):
        report('FAIL: Timeout during ' + stage + '.')
    except Exception as error:
        report('FAIL: ' + stage + '; error type ' + type(error).__name__ + '. Details hidden to protect secrets.')
    finally:
        client.close()
    return 1


if __name__ == '__main__':
    sys.exit(main())
