/**
 * Normalizes a string for accent-insensitive comparison.
 * "Hércules" → "hercules", "José" → "jose"
 */
export function normalizeText(str) {
  if (!str) return '';
  return str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
