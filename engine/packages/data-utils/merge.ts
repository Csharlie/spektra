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
  const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj);

  return objects.reduce((acc, obj) => {
    Object.keys(obj).forEach(key => {
      const accValue = (acc as any)[key];
      const objValue = (obj as any)[key];

      if (isObject(accValue) && isObject(objValue)) {
        (acc as any)[key] = deepMerge(accValue, objValue);
      } else {
        (acc as any)[key] = objValue;
      }
    });
    return acc;
  }, {} as T);
}
