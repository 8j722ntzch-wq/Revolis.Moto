import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import { resolve, relative, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const assets = resolve(root, 'public/assets');
const manifest = {};
async function walk(dir) {
  for (const item of (await readdir(dir, { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name))) {
    const path = resolve(dir, item.name);
    if (item.isDirectory()) { if (item.name !== 'optimized') await walk(path); continue; }
    if (!/\.(png|jpe?g|webp)$/i.test(item.name)) continue;
    const meta = await sharp(path).rotate().metadata();
    const width = meta.autoOrient?.width ?? meta.width;
    const height = meta.autoOrient?.height ?? meta.height;
    const source = '/assets/' + relative(assets, path);
    const variants = [];
    for (const size of [...new Set([160,320,480,768,1200,1920,2560].filter(n => n < width).concat(Math.min(width,2560)))].sort((a,b)=>a-b)) {
      const url = '/assets/optimized/' + relative(assets,path).slice(0,-extname(path).length) + `-${size}.webp`;
      const target = resolve(root,'public',url.slice(1));
      await mkdir(dirname(target),{recursive:true});
      const info = await sharp(path).rotate().resize({width:size,withoutEnlargement:true}).webp({quality:85,alphaQuality:100,effort:6}).toFile(target);
      variants.push({src:url,width:info.width,height:info.height,bytes:info.size});
    }
    manifest[source] = {width,height,originalBytes:(await stat(path)).size,variants};
  }
}
await walk(assets);
await writeFile(resolve(root,'src/data/image-variants.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(`Prepared ${Object.keys(manifest).length} images; ${Object.values(manifest).reduce((n,x)=>n+x.variants.length,0)} WebP variants.`);
