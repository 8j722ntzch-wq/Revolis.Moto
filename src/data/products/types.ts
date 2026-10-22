export interface ProductPhoto {
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
  modelId: string;
  source: { fileKey: string; desktop: string; mobile: string; capturedAt: string; contentStatus: 'figma-reference' | 'verified' };
  subtitle: string;
  intro: string;
  photos: ProductPhoto[];
  description?: { title: string; accent?: string; paragraphs: string[] };
  benefits?: ProductCard[];
  features?: ProductCard[];
  specifications?: SpecificationGroup[];
  support?: ProductCard[];
  comparison?: { family: string; models: string[]; rows: { label: string; values: string[] }[] };
  relatedModelIds?: string[];
  faq?: { question: string; answer: string }[];
}
