export function deepCompare(a: any, b: any): boolean {
    if (a === b) {
        return true;
    }

    if (typeof a !== typeof b) {
        return false;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepCompare(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }

    if (typeof a === 'object' && a !== null && b !== null) {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) return false;
        for (const key of aKeys) {
            if (!deepCompare(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }

    return false;
}
