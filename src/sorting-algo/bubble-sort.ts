export function bubbleSort(array: number[]): number[] {
  let needSwapCheck = true

  do {
    needSwapCheck = false
    for (let i = 0; i < array.length - 1; i += 1) {
      const current = array[i]
      const next = array[i + 1]
      if (typeof current === 'number' && typeof next === 'number') {
        if (current > next) {
          array[i + 1] = current
          array[i] = next
          needSwapCheck = true
        }
      }
    }
  } while (needSwapCheck)

  return array
}
