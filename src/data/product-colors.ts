/** Figma 333:9925 / 333:10359. Swatch geometry from Figma; model color lists confirmed by user 2026-10-23. */
export const productColors = {
  gray: { label: 'Серый', fill: '#757575' },
  yellow: { label: 'Жёлтый', fill: '#fdce33' },
  blue: { label: 'Синий', fill: '#0614d3' },
  green: { label: 'Зелёный', fill: '#295401' },
  black: { label: 'Чёрный', fill: 'var(--color-black)' },
  camouflage: { label: 'Камуфляж', fill: 'var(--color-black)', image: '/assets/product/color-camouflage.svg' },
} as const;
export type ProductColorId = keyof typeof productColors;
export const templateColors: readonly ProductColorId[] = ['gray','yellow','blue','green','black','camouflage'];
export function resolveProductColors(colors?: readonly ProductColorId[]) {
  return (colors ?? templateColors).map(id => ({ id, ...productColors[id] }));
}
