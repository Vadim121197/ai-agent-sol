export function firstAndLastFour(s: string): string {
  return s.length >= 4 ? s.slice(0, 4) + '...' + s.slice(-4) : s;
}
