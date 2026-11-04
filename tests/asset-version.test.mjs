import { test } from 'node:test';
import assert from 'node:assert/strict';
import { versionUrls } from '../scripts/version-assets.mjs';
test('versions image candidates, CSS and scripts without changing page links', () => {
  assert.equal(versionUrls('<img src="/assets/x.webp" srcset="/assets/x.webp 1x, /assets/y.webp 2x"><link href="/_astro/a.css"><a href="/models/">', 'abc'), '<img src="/assets/x.webp?v=abc" srcset="/assets/x.webp?v=abc 1x, /assets/y.webp?v=abc 2x"><link href="/_astro/a.css?v=abc"><a href="/models/">');
  assert.equal(versionUrls('url(/assets/x.svg) "/assets/x.png"', 'abc'), 'url(/assets/x.svg?v=abc) "/assets/x.png?v=abc"');
  assert.equal(versionUrls('/assets/x.svg?v=abc', 'def'), '/assets/x.svg?v=abc');
});
