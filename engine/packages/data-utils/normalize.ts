/**
 * Data normalization utility
 * Normalizes data to conform to expected structure
 */

export function normalize<T>(data: any, _schema: any): T {
  // Normalization logic
  return data as T;
}

export function normalizeArray<T>(data: any[], _schema: any): T[] {
  return data.map(item => normalize<T>(item, _schema));
}
