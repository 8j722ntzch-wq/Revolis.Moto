import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const homepage = process.argv.includes('--homepage');
const catalogue = process.argv.includes('--catalogue');
const infoPage = process.argv.find(arg => arg.startsWith('--page='))?.slice(7);
const infoTargets = { contacts: ['contacts/index.html', 'Revolis_Moto_Contacts.html'], privacy: ['privacypolicy/index.html', 'Revolis_Moto_Privacy.html'], '404': ['404.html', 'Revolis_Moto_404.html'] };
if (infoPage && !infoTargets[infoPage]) throw new Error('Unknown page export.');
const sku = process.argv.find(arg => arg.startsWith('--sku='))?.slice(6);
if (sku && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(sku)) throw new Error('Invalid SKU slug.');
const mobile = process.argv.includes('--mobile');
const mime = { '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png', '.webp': 'image/webp' };

function localAsset(url, base) {
  if (/^(?:data:|https?:|\/\/|#)/.test(url)) return null;
  const path = url.startsWith('/') ? resolve(dist, `.${url}`) : resolve(base, url);
  if (relative(dist, path).startsWith('..')) throw new Error(`Asset outside dist: ${url}`);
  return path;
}

async function asDataUrl(path) {
  const type = mime[extname(path)];
  if (!type) throw new Error(`Unsupported asset: ${path}`);
  return `data:${type};base64,${(await readFile(path)).toString('base64')}`;
}

async function replaceAsync(text, pattern, replacer) {
  const matches = [...text.matchAll(pattern)];
  const values = await Promise.all(matches.map(replacer));
  let index = 0;
  return text.replace(pattern, () => values[index++]);
}

let html = await readFile(resolve(dist, sku ? `models/${sku}/index.html` : infoPage ? infoTargets[infoPage][0] : catalogue ? 'models/index.html' : homepage ? 'index.html' : mobile ? 'ui-kit-mobile/index.html' : 'ui-kit/index.html'), 'utf8');
html = await replaceAsync(html, /<link rel="stylesheet" href="([^"]+)"\s*\/?>/g, async ([, url]) => {
  const path = localAsset(url, dist);
  if (!path) throw new Error('External stylesheet is not supported in the offline preview.');
  let css = await readFile(path, 'utf8');
  css = await replaceAsync(css, /url\(\s*["']?([^\s"'()]+)["']?\s*\)/g, async ([whole, assetUrl]) => {
    const asset = localAsset(assetUrl, dirname(path));
    return asset ? `url("${await asDataUrl(asset)}")` : whole;
  });
  return `<style>${css}</style>`;
});
html = await replaceAsync(html, /\bsrc="(\/(?:assets|_astro)\/[^"]+)"/g, async ([, url]) => `src="${await asDataUrl(localAsset(url, dist))}"`);
if (/<script[^>]+src=|\b(?:src|href)="\/(?:assets|_astro)\//.test(html)) throw new Error('Unresolved runtime dependency in offline preview.');
await mkdir(resolve(root, 'preview'), { recursive: true });
if (homepage) html = html.replaceAll('href="/#', 'href="#');
const output = resolve(root, sku ? `preview/Revolis_Moto_${sku}.html` : infoPage ? 'preview/' + infoTargets[infoPage][1] : catalogue ? 'preview/Revolis_Moto_Catalogue.html' : homepage ? 'preview/Revolis_Moto_Homepage.html' : mobile ? 'preview/Revolis_Moto_Mobile_UI_Kit.html' : 'preview/Revolis_Moto_UI_Kit.html');
await writeFile(output, html);
console.log(`Exported ${output} (${Buffer.byteLength(html)} bytes)`);
