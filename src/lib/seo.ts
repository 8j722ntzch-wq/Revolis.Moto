import { productPages } from '../data/products/index.ts';

/** One allowlist for canonical pages, indexing and the sitemap. */
export const searchPaths = ['/', '/models/', '/contacts/', ...productPages.map(page => page.model.path)];
export const isSearchPage = (pathname: string) => searchPaths.includes(pathname);
