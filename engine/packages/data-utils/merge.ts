/**
 * Data merge utility
 * Merges multiple data sources
 */

export function merge<T extends object>(...objects: Partial<T>[]): T {
  return objects.reduce((acc, obj) => {
    return { ...acc, ...obj };
  }, {}) as T;
}

export function deepMerge<T extends object>(...objects: Partial<T>[]): T {
  const isObject = (obj: unknown): obj is Record<string, unknown> => 
    obj !== null && typeof obj === 'object' && !Array.isArray(obj);

  return objects.reduce<T>((acc, obj) => {
    Object.keys(obj).forEach(key => {
      const accValue = (acc as Record<string, unknown>)[key];
      const objValue = (obj as Record<string, unknown>)[key];

      if (isObject(accValue) && isObject(objValue)) {
        (acc as Record<string, unknown>)[key] = deepMerge(accValue, objValue);
      } else {
        (acc as Record<string, unknown>)[key] = objValue;
      }
    });
    return acc;
  }, {} as T);
}
