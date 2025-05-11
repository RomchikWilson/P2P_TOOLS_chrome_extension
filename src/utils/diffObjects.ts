export function hasDifferences<T extends Record<string, any>>(init: T, curr: T): Boolean {
    for (const key in init) {
      if (init[key] !== curr[key]) return true;
    }
    return false;
  }