import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { imageAttrs, fullImage } from '../src/lib/responsive-images.ts';
import manifest from '../src/data/image-variants.json' with { type: 'json' };
test('generated WebP files exist, keep aspect ratio and never upscale originals', () => {
 for (const [source, entry] of Object.entries(manifest)) {
  assert.ok(existsSync('public'+source));
  let previous = 0;
  for (const v of entry.variants) {
   assert.ok(v.width > previous && v.width <= entry.width);
   assert.ok(Math.abs(v.height-v.width*entry.height/entry.width)<=1);
   const bytes=readFileSync('public'+v.src);
   assert.equal(bytes.subarray(8,12).toString(),'WEBP');
   previous=v.width;
  }
 }
});
test('thumbnail, card and full-size roles choose separate candidates; SVG passes through', () => {
 const source=Object.keys(manifest).find(key=>manifest[key].width>1200);
 assert.ok(source);
 assert.notEqual(imageAttrs(source,'thumbnail').src,imageAttrs(source,'full').src);
 assert.ok(imageAttrs(source,'thumbnail').srcset.split(',').every(v=>parseInt(v.trim().split(' ')[1])<=480));
 assert.equal(fullImage(source),manifest[source].variants.at(-1).src);
 assert.deepEqual(imageAttrs('/assets/logo.svg'),{src:'/assets/logo.svg'});
});
