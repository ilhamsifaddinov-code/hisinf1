export type Locale = 'uz' | 'kaa';

const LABELS = {
  uz: { bc: 'mil. avv.', year: 'yil', century: 'asr' },
  kaa: { bc: 'b.e.sh.', year: 'jıl', century: 'ásir' },
} as const;

export function formatYear(year: number, locale: Locale, approximate = false): string {
  if (!Number.isInteger(year) || year === 0) return `${year}`;
  const l = LABELS[locale] || LABELS.uz;
  const core = `${Math.abs(year)}-${l.year}`;
  const withEra = year < 0 ? `${l.bc} ${core}` : core;
  return approximate ? `~${withEra}` : withEra;
}

export function formatYearRange(
  start: number,
  end: number | null | undefined,
  locale: Locale,
  approximate = false
): string {
  if (!end) return formatYear(start, locale, approximate);
  const l = LABELS[locale] || LABELS.uz;
  const prefix = approximate ? '~' : '';
  if (start < 0 && end < 0) return `${prefix}${l.bc} ${Math.abs(start)}–${Math.abs(end)}`;
  if (start < 0 && end > 0) return `${prefix}${l.bc} ${Math.abs(start)} – ${end}`;
  return `${prefix}${start}–${end}`;
}

export function getCentury(year: number): number {
  return year > 0 ? Math.ceil(year / 100) : -Math.ceil(Math.abs(year) / 100);
}

const ROMAN: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

export function toRoman(n: number): string {
  let out = '';
  let rest = Math.abs(n);
  for (const [v, s] of ROMAN) {
    while (rest >= v) {
      out += s;
      rest -= v;
    }
  }
  return out;
}

export function formatCentury(century: number, locale: Locale): string {
  const l = LABELS[locale] || LABELS.uz;
  const core = `${toRoman(Math.abs(century))} ${l.century}`;
  return century < 0 ? `${l.bc} ${core}` : core;
}