import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { productDetails, productPages, hasProductPage, getRelatedModels, validateProducts } from '../src/data/products/index.ts';

test('only registered SKU paths are available and all related cards resolve', () => {
 assert.equal(hasProductPage('/models/baltmotors-500-efi-eps/'),true);
 assert.equal(hasProductPage('/models/baltmotors-700-efi/'),true);
 assert.equal(new Set(productPages.map(p=>p.slug)).size,productPages.length);
 for (const page of productPages) {
  assert.equal(page.model.id,page.details.modelId);
  assert.ok(getRelatedModels(page.details.relatedModelIds ?? []).every(Boolean));
 }
});
test('incomplete content is explicit and missing photos do not invent images', () => {
 const page=productDetails.find(p=>p.modelId==='baltmotors-500-efi-eps');
 assert.equal(page.photos.length,4);
 assert.equal(page.defaultColor,'black');
 assert.deepEqual(page.galleryPhotos,[]);
 const pending=page.specifications.flatMap(g=>g.rows).filter(r=>r.value===null);
 assert.deepEqual(pending.map(r=>r.label).sort(),['Сухая масса','Дорожный просвет','Топливный бак'].sort());
});
test('invalid additions fail before route generation', () => {
 const entry=structuredClone(productDetails[0]);
 assert.throws(()=>validateProducts([entry,entry]),/Duplicate/);
 assert.throws(()=>validateProducts([{...entry,modelId:'missing'}]),/Unknown/);
 assert.throws(()=>validateProducts([{...entry,relatedModelIds:['missing']}]),/Invalid related/);
 assert.throws(()=>validateProducts([{...entry,photos:[{src:'https://example.com/a.jpg',alt:'Фото',width:1,height:1}]}]),/Invalid product photo/);
 assert.throws(()=>validateProducts([{...entry,comparison:{family:'Test',models:['One'],rows:[{label:'Test',values:[]}]}}]),/column mismatch/);
 assert.doesNotThrow(()=>validateProducts([{modelId:entry.modelId,source:entry.source,subtitle:'',intro:'',photos:[]}]));
});
test('all SKU illustrations and related model images are local files',async()=>{
 const paths=new Set();
 for(const entry of productDetails) {
  for(const card of [...entry.features ?? [],...entry.benefits ?? [],...entry.support ?? []]) {paths.add(card.icon);if(card.art)paths.add(card.art);}
  for(const photo of entry.photos)paths.add(photo.src);
  for(const model of getRelatedModels(entry.relatedModelIds ?? []))if(model.image)paths.add(model.image);
 }
 for(const path of paths)await access(new URL('../public'+path,import.meta.url));
});
test('color collections and catalogue heroes match approved photos', () => {
 const expected = {'mikilon-hammer-touring-200': {gray:6,blue:5}, 'mikilon-hammer-touring-300': {blue:6,yellow:6}};
 for (const page of productPages) {
  const {photos,colors,defaultColor}=page.details;
  assert.ok(colors.includes(defaultColor));
  assert.equal(page.model.image,photos.find(photo=>photo.color===defaultColor).src);
  for (const color of colors) assert.equal(photos.filter(photo=>photo.color===color).length,expected[page.model.id]?.[color] ?? 1);
  assert.deepEqual(page.details.galleryPhotos,[]);
 }
});
