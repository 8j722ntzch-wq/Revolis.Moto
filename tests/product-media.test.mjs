import test from 'node:test';
import assert from 'node:assert/strict';
import { mediaPreview, nextPhoto } from '../src/lib/product-media.ts';
test('five mobile photos show main, two thumbnails and +2', () => {
 assert.deepEqual(mediaPreview(5,3), {indices:[1,2],hidden:2,firstHidden:3});
});
test('preview never duplicates main or loses photos at count boundaries', () => {
 for(const slots of [3,4]) for(const count of [0,1,2,3,4,5,8,20]) {
  const result=mediaPreview(count,slots);
  assert.equal(result.indices.length+result.hidden+(count?1:0),count);
  assert.ok(result.indices.every(i=>i>0&&i<count));
  assert.ok(result.indices.length+(result.hidden?1:0)<=slots);
  if(result.hidden)assert.equal(count-result.firstHidden,result.hidden);
 }
});
test('viewer navigation wraps in both directions including one image', () => {
 assert.equal(nextPhoto(0,-1,5),4);
 assert.equal(nextPhoto(4,1,5),0);
 assert.equal(nextPhoto(0,-1,1),0);
});
