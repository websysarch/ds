function mergeSortedArray(array1: number[], array2: number[]): number[] {
  let idx1 = 0
  let idx2 = 0
  const mergedArray = new Array<number>(array1.length + array2.length)
  while (idx1 < array1.length && idx2 < array2.length) {
    const num1 = array1[idx1] as number
    const num2 = array2[idx2] as number
    if (num1 < num2) {
      mergedArray[idx1 + idx2] = num1
      idx1 += 1
    } else {
      mergedArray[idx1 + idx2] = num2
      idx2 += 1
    }
  }
  while (idx1 < array1.length) {
    mergedArray[idx1 + idx2] = array1[idx1] as number
    idx1 += 1
  }
  while (idx2 < array2.length) {
    mergedArray[idx1 + idx2] = array2[idx2] as number
    idx2 += 1
  }
  return mergedArray
}

export function mergeSort(array: number[]): number[] {
  if (array.length <= 1) return array
  const middle = Math.floor(array.length / 2)
  const leftArr = array.slice(0, middle)
  const rightArr = array.slice(middle)
  return mergeSortedArray(mergeSort(leftArr), mergeSort(rightArr))
}
