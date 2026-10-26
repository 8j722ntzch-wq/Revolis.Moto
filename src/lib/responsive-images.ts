import manifest from '../data/image-variants.json' with { type: 'json' };
export type ImageRole = 'thumbnail' | 'card' | 'hero' | 'gallery' | 'banner' | 'full';
type Variant = { src: string; width: number; height: number; bytes: number };
type Entry = { width: number; height: number; originalBytes: number; variants: Variant[] };
const images: Record<string, Entry> = manifest;
export const imageSizes: Record<ImageRole,string> = {
  thumbnail: '(max-width: 1287px) 25vw, 140px',
  card: '(max-width: 1287px) min(100vw - 50px, 420px), 420px',
  hero: '(max-width: 1287px) calc(100vw - 50px), 720px',
  gallery: '(max-width: 1287px) calc(100vw - 50px), 600px',
  banner: '(max-width: 1287px) 100vw, 1200px',
  full: '100vw',
};
export function imageAttrs(source: string, role: ImageRole = 'card') {
  const entry = images[source];
  if (!entry) return { src: source };
  const cap = role === 'thumbnail' ? 480 : role === 'card' ? 1200 : 2560;
  const variants = entry.variants.filter(v => v.width <= cap);
  if (!variants.length) variants.push(entry.variants[0]);
  const preferred = role === 'thumbnail' ? 320 : role === 'full' ? 1920 : 768;
  return {
    src: (variants.find(v => v.width >= preferred) ?? variants.at(-1)!).src,
    srcset: variants.map(v => `${v.src} ${v.width}w`).join(', '),
    sizes: imageSizes[role],
  };
}
export function fullImage(source: string) {
  return images[source]?.variants.at(-1)?.src ?? source;
}
