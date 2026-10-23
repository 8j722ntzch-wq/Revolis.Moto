/** Figma 333:9925 / 333:10359. Shared palette, not per-model stock confirmation. */
export const productColors = {
  gray: { label: 'Серый', fill: '#757575' },
  yellow: { label: 'Жёлтый', fill: '#fdce33' },
  blue: { label: 'Синий', fill: '#0614d3' },
  khaki: { label: 'Хаки', fill: '#295401' },
  black: { label: 'Чёрный', fill: 'var(--color-black)' },
  camouflage: { label: 'Камуфляж', fill: 'var(--color-black)', image: '/assets/product/color-camouflage.svg' },
} as const;
export type ProductColorId = keyof typeof productColors;
export const templateColors: readonly ProductColorId[] = ['gray','yellow','blue','khaki','black','camouflage'];
export function resolveProductColors(colors?: readonly ProductColorId[]) {
  return (colors ?? templateColors).map(id => ({ id, ...productColors[id] }));
}
