export function countingSort(array: number[]) {
  const min = Math.min(...array)
  const max = Math.max(...array)
  const countIdx = new Array(max - min + 1).fill(0)
  const sortedArr = new Array(array.length)
  array.forEach(val => {
    countIdx[val - min] += 1
  })
  for (let i = 1; i < countIdx.length; i += 1) {
    countIdx[i] += countIdx[i - 1] as number
  }
  for (let i = array.length - 1; i >= 0; i -= 1) {
    const idx = (array[i] as number) - min
    countIdx[idx] -= 1
    sortedArr[countIdx[idx]] = array[i]
  }
  sortedArr.forEach((val, idx) => {
    array[idx] = val
  })
  return array
}
