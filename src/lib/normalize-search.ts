const APOS = /['`´‘’ʻʼʹ]/g;

export function normalizeSearch(input: string): string {
  if (!input) return '';
  return input
    .toLowerCase()
    .replace(APOS, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchesSearch(source: string, query: string): boolean {
  if (!query.trim()) return true;
  const nSource = normalizeSearch(source);
  const nQuery = normalizeSearch(query);
  const words = nQuery.split(' ').filter(Boolean);
  return words.every((w) => nSource.includes(w));
}