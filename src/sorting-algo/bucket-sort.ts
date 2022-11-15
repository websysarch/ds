import { insertionSort } from './insertion-sort'

export function bucketSort(array: number[]): number[] {
  const n = array.length
  const allBuckets = new Array<number[]>(n)
  if (n < 2) return array

  for (let i = 0; i < n; i += 1) {
    allBuckets[i] = [] as number[]
  }
  array.forEach(val => {
    const bucketIdx = Math.floor((n * val) / 10)
    allBuckets[bucketIdx]?.push(val)
  })

  let i = 0
  allBuckets.forEach(bucket => {
    insertionSort(bucket)
    bucket.forEach(item => {
      array[i] = item
      i += 1
    })
  })

  return array
}
