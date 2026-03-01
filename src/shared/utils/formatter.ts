type AnyObj = Record<string, unknown>;

export function deleteEmptyKeys<T extends AnyObj>(obj: T): T {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];

    const isEmpty =
            value === undefined ||
            value === null ||
            (typeof value === "string" && value.trim() === "");

    if (isEmpty) {
      delete obj[key];
    }
  }

  return obj;
}
