import { swapNumber } from './sorting-utils'

function partition(array: number[], leftIdx: number, rightIdx: number) {
  const pivotValue = array[rightIdx] as number
  let pivotIdx = leftIdx
  for (let i = leftIdx; i < rightIdx; i += 1) {
    const current = array[i] as number
    if (current < pivotValue) {
      swapNumber(array, pivotIdx, i)
      pivotIdx += 1
    }
  }
  swapNumber(array, rightIdx, pivotIdx)
  return pivotIdx
}

function partitionRandomized(array: number[], leftIdx: number, rightIdx: number) {
  // Below could be randomized or may be the middle value
  const pivotIdx = Math.floor(Math.random() * (rightIdx - leftIdx + 1) + leftIdx)
  // Move the randomly selected pivot value to the end of the list by swapping.
  swapNumber(array, pivotIdx, rightIdx)
  return partition(array, leftIdx, rightIdx)
}

export function quickSort(array: number[], leftIdx = 0, rightIdx = array.length - 1): number[] {
  if (leftIdx >= rightIdx) return array
  const pivotIdx = partitionRandomized(array, leftIdx, rightIdx)
  if (leftIdx < pivotIdx - 1) {
    quickSort(array, leftIdx, pivotIdx - 1)
  }
  if (rightIdx > pivotIdx + 1) {
    quickSort(array, pivotIdx + 1, rightIdx)
  }

  return array
}
