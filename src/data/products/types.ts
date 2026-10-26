import type { ProductColorId } from '../product-colors';
export interface ProductPhoto {
 color?: ProductColorId;
  /** Site-local original; no temporary Figma URLs. */
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: 'contain' | 'cover';
  position?: string;
}
export interface ProductCard { title: string; body: string; icon: string; accent?: boolean; art?: string; }
export interface SpecificationGroup { title: string; rows: { label: string; value: string | null }[]; }
export interface ProductDetails {
 defaultColor?: ProductColorId;
  modelId: string;
  source: { fileKey: string; desktop: string; mobile: string; capturedAt: string; contentStatus: 'figma-reference' | 'notion-reference' | 'verified'; notionUrl?: string; retrievedAt?: string };
  subtitle: string;
  intro: string;
  /** Optional editorial metadata; legacy pages retain their current fallback. */
  seoTitle?: string;
  seoDescription?: string;
  testDriveLabel?: string;
  /** Hero photographs only; independent of the editorial gallery below. */
  /** Undefined: provisional template palette. Empty: hide block. Explicit list: model palette. */
  colors?: readonly ProductColorId[];
  photos: ProductPhoto[];
  galleryPhotos?: ProductPhoto[];
  description?: { title: string; accent?: string; paragraphs: string[] };
  benefits?: ProductCard[];
  features?: ProductCard[];
  specifications?: SpecificationGroup[];
  specificationNote?: string;
  support?: ProductCard[];
  comparison?: { family: string; models: string[]; rows: { label: string; values: string[] }[] };
  relatedModelIds?: string[];
  faq?: { question: string; answer: string }[];
}
