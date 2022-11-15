import { swapNumber } from './sorting-utils'
export function selectionSort(array: number[]): number[] {
  for (let i = 0; i < array.length; i += 1) {
    let minIdx = i
    for (let j = i + 1; j < array.length; j += 1) {
      if ((array[minIdx] as number) > (array[j] as number)) {
        minIdx = j
      }
    }
    swapNumber(array, minIdx, i)
  }
  return array
}
