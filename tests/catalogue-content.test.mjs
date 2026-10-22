import test from 'node:test';
import assert from 'node:assert/strict';
import { models, catalogueModels, homepageModels } from '../src/data/catalog.ts';
import { productPages, productDetails, getRelatedModels } from '../src/data/products/index.ts';
const rows=id=>productDetails.find(p=>p.modelId===id).specifications.flatMap(g=>g.rows);
const value=(id,label)=>rows(id).find(r=>r.label===label)?.value;
test('seven supplied models have unique routes and consistent card data; RBMotors is hidden',()=>{
 assert.equal(models.length,7);assert.equal(productPages.length,7);assert.equal(catalogueModels.length,7);
 assert.ok(models.every(m=>m.brand!=='RBMotors'));
 for(const model of [...catalogueModels,...homepageModels]){
  const page=productPages.find(p=>p.model.path===model.path);
  assert.ok(page);assert.equal(page.model.id,model.id);assert.equal(page.model.priceByn,model.priceByn);
 }
 for(const p of productPages)assert.ok(getRelatedModels(p.details.relatedModelIds).every(m=>m.id!==p.model.id&&productPages.some(p=>p.model.id===m.id)));
});
test('500 EPS reconciles bore/stroke and ignition without inventing disputed values',()=>{
 const id='baltmotors-500-efi-eps';
 assert.equal(value(id,'Диаметр цилиндра × ход поршня'),'84,5 × 84 мм');
 assert.match(value(id,'Система зажигания'),/ECU/);
 assert.ok(!rows(id).some(r=>r.label==='Мощность'));
 for(const label of ['Сухая масса','Дорожный просвет','Топливный бак'])assert.equal(value(id,label),null);
});
test('Hammer 300 uses approved ranges and keeps shaft drive distinct from 200 chain drive',()=>{
 assert.equal(value('mikilon-hammer-touring-300','Длина'),'1940–1970 мм');
 assert.equal(value('mikilon-hammer-touring-300','Снаряжённая масса'),'290–300 кг');
 assert.match(value('mikilon-hammer-touring-300','Привод на колёса'),/Кардан/);
 assert.equal(value('mikilon-hammer-touring-200','Главная передача'),'Цепная');
 assert.ok(!JSON.stringify(productDetails).includes('Avantis'));
});
test('all pages retain source provenance and omit editorial instructions and fake offers',()=>{
 for(const p of productDetails){
  assert.match(p.source.notionUrl,/notion.so/); assert.equal(p.specifications.length,4);assert.equal(p.features.length,6);assert.ok(p.faq.length>=5);
  assert.ok(!JSON.stringify(p).match(/Я бы|Не переносим|Текст для страницы|TO на квадро|Актуальная цена|XX XXX/));
 }
 assert.ok(models.every(m=>m.priceByn===null&&m.availability==='unconfirmed'));
});
