export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

export function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}
