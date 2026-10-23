import { productMedia } from './media.ts';
import { productColors } from '../product-colors.ts';
import { models } from '../catalog.ts';
import type { ProductDetails } from './types.ts';
import { striker400 } from './striker-400-efi.ts';
import { striker500 } from './striker-500-efi.ts';
import { striker500Eps } from './striker-500-efi-eps.ts';
import { striker700 } from './striker-700-efi.ts';
import { striker700Eps } from './striker-700-efi-eps.ts';
import { hammer200 } from './hammer-touring-200.ts';
import { hammer300 } from './hammer-touring-300.ts';
/** Register only populated pages. Layout readiness is separate from offer verification. */
export const productDetails: readonly ProductDetails[] = [striker400, striker500, striker500Eps, striker700, striker700Eps, hammer200, hammer300].map(entry => ({ ...entry, ...productMedia[entry.modelId] }));

export function validateProducts(entries: readonly ProductDetails[]) {
  const ids = new Set<string>();
  for (const entry of entries) {
    if (ids.has(entry.modelId)) throw new Error('Duplicate product: ' + entry.modelId);
    ids.add(entry.modelId);
    if (entry.colors && (new Set(entry.colors).size !== entry.colors.length || entry.colors.some(id => !Object.hasOwn(productColors, id)))) throw new Error('Invalid product colors: ' + entry.modelId);
    if (!models.some(model => model.id === entry.modelId)) throw new Error('Unknown product: ' + entry.modelId);
    for (const photo of [...entry.photos, ...entry.galleryPhotos ?? []]) {
      if (!photo.src.startsWith('/assets/') || photo.src.includes('..') || !photo.alt.trim() || !(photo.width > 0 && photo.height > 0)) throw new Error('Invalid product photo: ' + entry.modelId);
    }
    for (const id of entry.relatedModelIds ?? []) {
      if (!models.some(model => model.id === id) || id === entry.modelId) throw new Error('Invalid related model: ' + id);
    }
    for (const row of entry.comparison?.rows ?? []) {
      if (row.values.length !== entry.comparison!.models.length) throw new Error('Comparison column mismatch: ' + entry.modelId);
    }
  }
}
validateProducts(productDetails);

/** Model cards and detail pages share one current catalogue source. */
export const productPages = productDetails.map(details => {
 const model = models.find(model => model.id === details.modelId)!;
 return { details, model, slug: model.path.split('/')[2] };
});
export type ProductPage = typeof productPages[number];
export const hasProductPage = (path: string) => productPages.some(page => page.model.path === path);
export const getRelatedModels = (ids: readonly string[]) => ids.flatMap(id => {
 const model = models.find(model => model.id === id);
 return model ? [model] : [];
});
