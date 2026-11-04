import importlib.util
import os
from pathlib import Path
import stat
import tempfile
from types import SimpleNamespace
import unittest

spec = importlib.util.spec_from_file_location('deploy', Path(__file__).resolve().parents[2] / 'scripts/deploy-hoster.py')
deploy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(deploy)

class SFTP:
    def __init__(self, files):
        self.files = dict(files)
        self.dirs = {'/', '/site', '/backups'}
        self.uploads = []
        self.corrupt = False
        self.fail_target = None
    def lstat(self, p):
        if p in self.dirs: return SimpleNamespace(st_mode=stat.S_IFDIR)
        if p in self.files: return SimpleNamespace(st_mode=stat.S_IFREG)
        raise FileNotFoundError(p)
    def mkdir(self, p, mode): self.dirs.add(p)
    def getfo(self, p, output, **kwargs):
        assert kwargs['max_concurrent_prefetch_requests'] == 32
        output.write(self.files[p])
    def putfo(self, source, p, **kwargs):
        self.uploads.append(p)
        self.files[p] = source.read() + (b'bad' if self.corrupt and '.upload-' in p else b'')
    def chmod(self, *args): pass
    def posix_rename(self, a, b):
        if b == self.fail_target and '.upload-' in a: raise OSError('injected')
        self.files[b] = self.files.pop(a)
    def remove(self, p): del self.files[p]

class DeployTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.cwd = os.getcwd()
        os.chdir(self.tmp.name)
        Path('dist').mkdir()
    def tearDown(self):
        os.chdir(self.cwd)
        self.tmp.cleanup()
    def run_publish(self, remote, files):
        for name, content in files.items(): Path('dist', name).write_bytes(content)
        return deploy.publish(remote, '/site', '/backups/run', 'run', sorted(Path('dist').iterdir()))
    def test_unchanged_skips_upload_and_backup(self):
        remote = SFTP({'/site/index.html': b'same'})
        self.assertEqual(self.run_publish(remote, {'index.html': b'same'}), (0, 1))
        self.assertEqual(remote.uploads, [])
    def test_update_preserves_backup_and_unrelated(self):
        remote = SFTP({'/site/index.html': b'old', '/site/api.php': b'backend'})
        self.run_publish(remote, {'index.html': b'new'})
        self.assertEqual(remote.files['/site/index.html'], b'new')
        self.assertEqual(remote.files['/backups/run/index.html'], b'old')
        self.assertEqual(remote.files['/site/api.php'], b'backend')
    def test_corrupt_upload_never_activated(self):
        remote = SFTP({'/site/index.html': b'old'}); remote.corrupt = True
        with self.assertRaises(ValueError): self.run_publish(remote, {'index.html': b'new'})
        self.assertEqual(remote.files['/site/index.html'], b'old')
    def test_activation_failure_rolls_back(self):
        remote = SFTP({'/site/a.css': b'old css', '/site/index.html': b'old html'})
        remote.fail_target = '/site/index.html'
        with self.assertRaises(OSError): self.run_publish(remote, {'a.css': b'new css', 'index.html': b'new html'})
        self.assertEqual(remote.files['/site/a.css'], b'old css')
        self.assertEqual(remote.files['/site/index.html'], b'old html')
    def test_cache_rules_preserve_host_rules_and_are_idempotent(self):
        block = b'# BEGIN REVOLIS CACHE\nHeader set Cache-Control "no-cache"\n# END REVOLIS CACHE\n'
        result = deploy.merge_cache_rules(b'DirectoryIndex index.html\n', block)
        self.assertTrue(result.startswith(b'DirectoryIndex index.html'))
        self.assertEqual(deploy.merge_cache_rules(result, block), result)
        with self.assertRaises(ValueError): deploy.merge_cache_rules(b'# BEGIN REVOLIS CACHE', block)

if __name__ == '__main__': unittest.main()
