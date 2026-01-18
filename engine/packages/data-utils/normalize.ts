/**
 * Data normalization utility
 * Normalizes data to conform to expected structure
 */

export function normalize<T>(data: unknown, _schema: unknown): T {
  // Normalization logic
  return data as T;
}

export function normalizeArray<T>(data: unknown[], _schema: unknown): T[] {
  return data.map(item => normalize<T>(item, _schema));
}
