import { createHash } from 'node:crypto';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

export function versionUrls(text, version) {
  return text.replace(/\/(?:assets|_astro)\/[^\s"'<>`()\\,;?]+\.(?:css|m?js|svg|png|jpe?g|webp|gif|ico|woff2?)(?![\w.?])/g,
    url => `${url}?v=${version}`);
}
async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const groups = await Promise.all(entries.map(entry => entry.isDirectory() ? filesIn(join(dir, entry.name)) : [join(dir, entry.name)]));
  return groups.flat().sort();
}
export async function versionBuild(root = 'dist') {
  const files = await filesIn(root);
  const hash = createHash('sha256');
  for (const file of files) { hash.update(file.slice(root.length)); hash.update(await readFile(file)); }
  const version = hash.digest('hex').slice(0, 16);
  for (const file of files.filter(file => /\.(html|css|m?js)$/.test(file))) {
    const original = await readFile(file, 'utf8');
    await writeFile(file, versionUrls(original, version));
  }
  console.log(`Asset URLs versioned: ${version}`);
}
if (process.argv[1]?.endsWith('/version-assets.mjs') || process.argv[1] === 'scripts/version-assets.mjs') await versionBuild();
