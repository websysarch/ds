export function swapNumber(array: number[], swapIdx1: number, swapIdx2: number): void {
  if (
    swapIdx1 >= 0 &&
    swapIdx2 >= 0 &&
    swapIdx1 < array.length &&
    swapIdx2 < array.length &&
    swapIdx1 !== swapIdx2
  ) {
    const temp = array[swapIdx1] as number
    array[swapIdx1] = array[swapIdx2] as number
    array[swapIdx2] = temp
  }
}

export type Comparator<T> = (a: T, b: T) => number

export const numberComparator: Comparator<number> = (a, b) => {
  if (a === b) return 0
  if (a > b) return 1
  return -1
}
