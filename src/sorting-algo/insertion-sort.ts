export function insertionSort(array: number[]): number[] {
  for (let i = 1; i < array.length; i += 1) {
    const temp = array[i] as number
    let j = i - 1
    while (j >= 0 && (array[j] as number) > temp) {
      array[j + 1] = array[j] as number
      j -= 1
    }
    array[j + 1] = temp
  }
  return array
}
