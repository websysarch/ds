function getPlaceValue(digit: number, radix: number) {
  return Math.pow(radix, digit - 1)
}

function getFaceVal(num: number, digit: number, radix: number) {
  const placeValue = getPlaceValue(digit, radix)
  return Math.floor(num / placeValue) % radix
}

function getDigitCount(num: number) {
  let digit = 0
  let divider = 1
  while (num / divider >= 1) {
    divider *= 10
    digit += 1
  }
  return digit
}

export function radixSort(array: number[]): number[] {
  const radix = 10 // for decimal number
  const buckets = new Array<number[]>(radix).fill([])
  const totalDigit = getDigitCount(Math.max(...array))
  for (let digit = 1; digit <= totalDigit; digit += 1) {
    for (let i = 0; i <= radix; i += 1) {
      buckets[i] = []
    }
    array.forEach(num => {
      const faceVal = getFaceVal(num, digit, radix)
      buckets[faceVal]?.push(num)
    })
    let i = 0
    for (const bucket of buckets) {
      for (const item of bucket) {
        array[i] = item
        i += 1
      }
    }
  }
  return array
}
