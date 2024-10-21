export function getKeysFromEnum<T>(enumObject: T): string[] {
    const allKeys = Object.keys(enumObject);
    return allKeys.slice(0, allKeys.length / 2);
}

export function getValuesFromEnum<T>(enumObject: T): string[] {
    const allKeys = Object.keys(enumObject);
    return allKeys.slice(allKeys.length / 2);
}
