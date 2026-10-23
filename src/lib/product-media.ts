/** Main photo is separate from previews; the last slot represents all remaining photos. */
export function mediaPreview(count: number, smallSlots: number) {
  const visible = Math.min(Math.max(0, count - 1), smallSlots - 1);
  return { indices: Array.from({ length: visible }, (_, i) => i + 1), hidden: Math.max(0, count - visible - 1), firstHidden: visible + 1 };
}
export function nextPhoto(index: number, delta: number, count: number) {
  return count ? (index + delta + count) % count : 0;
}
