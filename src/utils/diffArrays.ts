export function diffArrays<T>(initArray: T[], currArray: T[]): T[] {
  const diffData: T[] = [];

  for (let i = 0; i < Math.max(initArray.length, currArray.length); i++) {
    const init = initArray[i];
    const curr = currArray[i];

    if (!isEqual(init, curr)) {
      diffData.push(curr);
    }
  }

  return diffData;
}

function isEqual(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
