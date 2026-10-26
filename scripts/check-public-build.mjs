import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { searchPaths } from '../src/lib/seo.ts';

const release = process.argv.includes('--release');
const read = path => readFile(`dist/${path}`, 'utf8');
for (const path of ['ui-kit', 'ui-kit-mobile']) {
  await assert.rejects(access(`dist/${path}`), { code: 'ENOENT' });
}
const sitemap = await read('sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.deepEqual(urls, release ? searchPaths.map(path => `https://revolis.by${path}`) : []);
assert.equal(new Set(urls).size, urls.length);
for (const path of searchPaths) {
  const html = await read(path.slice(1) + 'index.html');
  assert.ok(html.includes(`name="robots" content="${release ? 'index,follow' : 'noindex,nofollow'}"`), path);
  assert.ok(html.includes(`rel="canonical" href="https://revolis.by${path}"`), path);
  assert.ok(!/href="\/ui-kit(?:-mobile)?\//.test(html), path);
}
for (const path of ['404.html', 'privacypolicy/index.html']) {
  const html = await read(path);
  assert.ok(html.includes('name="robots" content="noindex,nofollow"'), path);
  assert.ok(!html.includes('rel="canonical"'), path);
}
const robots = await read('robots.txt');
assert.equal(robots, release ? 'User-agent: *\nAllow: /\nSitemap: https://revolis.by/sitemap.xml\n' : 'User-agent: *\nDisallow: /\n');
console.log(`Public build verified: ${release ? 'release' : 'preview'}, ${urls.length} sitemap URLs, no UI Kit routes.`);
