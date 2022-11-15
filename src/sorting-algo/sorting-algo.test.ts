import { describe, test, expect, beforeEach } from '@jest/globals'
import { bubbleSort } from './bubble-sort'
import { insertionSort } from './insertion-sort'
import { mergeSort } from './merge-sort'
import { quickSort } from './quick-sort'
import { selectionSort } from './selection-sort'

const defaultValues = [2, 1, 7, 4, 0, 8, 5]
const sortedDefaultValues = [...defaultValues].sort((a, b) => a - b)
let nonEmptyArray: number[]

beforeEach(() => {
  nonEmptyArray = [...defaultValues]
})

const testCases: [string, typeof bubbleSort][] = [
  ['Bubble', bubbleSort],
  ['Insertion', insertionSort],
  ['Merge', mergeSort],
  ['Quick', quickSort],
  ['Selection', selectionSort],
]

describe.each(testCases)('%s Sort', (_, sortingFunction) => {
  test('isSorted', () => {
    expect(sortingFunction(nonEmptyArray)).toStrictEqual(sortedDefaultValues)
  })
})
