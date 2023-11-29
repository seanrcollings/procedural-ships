export function rangeRandom(start: number, end: number) {
  return Math.random() * (end - start) + start;
}

export function paddedRandom(max: number, padding: number) {
  return Math.random() * (max - padding * 2) + padding;
}
