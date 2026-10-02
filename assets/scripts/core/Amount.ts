/** Non-negative amounts stored in log10 space. ZERO is JSON-safe. */
export const ZERO = -1e300;
export const amount = (n: number): number => n > 0 ? Math.log10(n) : ZERO;
export function add(a: number, b: number): number {
    if (a === ZERO)
        return b;
    if (b === ZERO)
        return a;
    const hi = Math.max(a, b), lo = Math.min(a, b);
    return hi - lo > 16 ? hi : hi + Math.log10(1 + Math.pow(10, lo - hi));
}
export function sub(a: number, b: number): number {
    if (b === ZERO)
        return a;
    if (b >= a - 1e-12)
        return ZERO;
    return a + Math.log10(1 - Math.pow(10, b - a));
}
export function mul(a: number, n: number): number { return a === ZERO || n <= 0 ? ZERO : a + Math.log10(n); }
export function fmt(a: number, scientific=false): string {
    if (a === ZERO || a < -2)
        return '0';
    if(scientific && a>=3)return `${Math.pow(10,a%1).toFixed(2)}e${Math.floor(a)}`;
    if (a < 3)
        return Math.floor(Math.pow(10, a) + 1e-8).toString();
    const group = Math.floor(a / 3), suffix = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No'];
    return group < suffix.length ? `${Math.pow(10, a - group * 3).toFixed(1)}${suffix[group]}` : `${Math.pow(10, a % 1).toFixed(2)}e${Math.floor(a)}`;
}
export const display = (n: number): string => fmt(amount(n));
export function ratio(a: number, b: number): number { return Math.min(1, Math.max(0, Math.pow(10, a - b))); }
