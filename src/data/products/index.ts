import { models, catalogueModelReferences } from '../catalog.ts';
import { striker500Eps } from './striker-500-efi-eps.ts';
import type { ProductDetails } from './types.ts';

/** Register only populated pages. Layout readiness is separate from offer verification. */
export const productDetails: readonly ProductDetails[] = [striker500Eps];

export function validateProducts(entries: readonly ProductDetails[]) {
  const ids = new Set<string>();
  for (const entry of entries) {
    if (ids.has(entry.modelId)) throw new Error('Duplicate product: ' + entry.modelId);
    ids.add(entry.modelId);
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

/** Commercial values still come from explicit catalogue fixtures until verified. */
export const productPages = productDetails.map(details => {
  const canonical = models.find(model => model.id === details.modelId)!;
  const reference = catalogueModelReferences.find(model => model.path === canonical.path);
  if (!reference) throw new Error('Missing catalogue reference: ' + details.modelId);
  return { details, model: { ...reference, id: canonical.id, pageReady: true }, slug: canonical.path.split('/')[2] };
});
export type ProductPage = typeof productPages[number];
export const hasProductPage = (path: string) => productPages.some(page => page.model.path === path);
export const getRelatedModels = (ids: readonly string[]) => ids.map(id => {
  const canonical = models.find(model => model.id === id)!;
  return catalogueModelReferences.find(model => model.path === canonical.path)!;
});
