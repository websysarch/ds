import { beforeEach, describe, expect, test } from '@jest/globals'
import { LinkedList } from './linked-list'

let emptyLinkedList: LinkedList<number>
let nonEmptyLinkedList: LinkedList<number>
const defaultLinkedListElements = [10, 11, 12, 13, 14]

beforeEach(() => {
  emptyLinkedList = new LinkedList()
  nonEmptyLinkedList = new LinkedList(defaultLinkedListElements)
})

function expectArrEquivalent<T>(linkedList: LinkedList<T>, arr: T[]) {
  expect(linkedList.length).toBe(arr.length)
  expect(linkedList.peekHead()).toBe(arr[0])
  expect(linkedList.peekTail()).toBe(arr[arr.length - 1])

  for (const element of arr) {
    expect(linkedList).toContain(element)
  }
  expect([...linkedList].length).toBe(arr.length)
}

describe('Initialization', () => {
  test('Empty', () => {
    expectArrEquivalent(emptyLinkedList, [])
  })
  test('NonEmpty', () => {
    expectArrEquivalent(nonEmptyLinkedList, defaultLinkedListElements)
  })
})

describe('Push', () => {
  test('Empty: Single Push', () => {
    emptyLinkedList.push(20)
    expectArrEquivalent(emptyLinkedList, [20])
  })
  test('Empty: Multi Push', () => {
    const pushArr = [20, 21, 22]
    pushArr.forEach(element => {
      emptyLinkedList.push(element)
    })
    expectArrEquivalent(emptyLinkedList, pushArr)
  })
})

describe('Pop', () => {
  test('Empty', () => {
    expect(() => emptyLinkedList.pop()).toThrow()
  })
  test('Non-empty', () => {
    expect(() => emptyLinkedList.pop()).toThrow()
  })
})

describe('Shift', () => {
  test('Empty: Single Shift', () => {
    emptyLinkedList.shift(20)
    expectArrEquivalent(emptyLinkedList, [20])
  })
  test('Empty: Multi Shift', () => {
    const shiftArr = [20, 21, 22]
    shiftArr.forEach(element => {
      emptyLinkedList.shift(element)
    })
    expectArrEquivalent(emptyLinkedList, [...shiftArr].reverse())
  })

  test('NonEmpty: Single Shift', () => {
    nonEmptyLinkedList.shift(20)
    expectArrEquivalent(nonEmptyLinkedList, [20, ...defaultLinkedListElements])
  })

  test('NonEmpty: Multi Shift', () => {
    const shiftArr = [20, 21, 22]
    shiftArr.forEach(element => {
      nonEmptyLinkedList.shift(element)
    })
    expectArrEquivalent(nonEmptyLinkedList, [
      ...[...shiftArr].reverse(),
      ...defaultLinkedListElements,
    ])
  })
})

describe('UnShift', () => {
  test('Empty', () => {
    emptyLinkedList.push(10)
    emptyLinkedList.push(11)
    emptyLinkedList.push(12)
    expect(emptyLinkedList.length).toBe(3)
    expect(emptyLinkedList.unshift()).toBe(10)
    expect(emptyLinkedList.length).toBe(2)
    expect(emptyLinkedList.unshift()).toBe(11)
    expect(emptyLinkedList.length).toBe(1)
    expect(emptyLinkedList.unshift()).toBe(12)
    expect(emptyLinkedList.length).toBe(0)
    expect(emptyLinkedList.unshift()).toBe(undefined)
  })

  test('NonEmpty', () => {
    defaultLinkedListElements.forEach((element, idx) => {
      expect(nonEmptyLinkedList.length).toBe(defaultLinkedListElements.length - idx)
      expect(nonEmptyLinkedList.unshift()).toBe(element)
      expect(nonEmptyLinkedList.length).toBe(defaultLinkedListElements.length - idx - 1)
    })
  })
})

describe('Insert After', () => {
  test('Empty: Always true', () => {
    emptyLinkedList.insertAfter(31, () => true)
    // expect(emptyLinkedList).toContain(31)
    expect(emptyLinkedList.peekHead()).toBe(undefined)
    expect(emptyLinkedList.peekTail()).toBe(undefined)
  })
  test('NonEmpty: Always true', () => {
    nonEmptyLinkedList.insertAfter(31, () => true)
    expect(nonEmptyLinkedList).toContain(31)
    expect(nonEmptyLinkedList.peekHead()).toBe(defaultLinkedListElements[0])
  })

  test('NonEmpty: InsertAfter - At End', () => {
    const lastItem = defaultLinkedListElements[defaultLinkedListElements.length - 1]
    nonEmptyLinkedList.insertAfter(31, node => node.data === lastItem)
    expect(nonEmptyLinkedList).toContain(31)
    expect(nonEmptyLinkedList.peekTail()).toBe(31)
  })

  test('NonEmpty: Insert After - AT Middle', () => {
    const insertAfterItem = defaultLinkedListElements[
      defaultLinkedListElements.length - 2
    ] as number
    nonEmptyLinkedList.insertAfter(31, node => node.data === insertAfterItem)
    expect(nonEmptyLinkedList).toContain(31)
    const linkedListArr = Array.from(nonEmptyLinkedList)
    expect(linkedListArr.indexOf(31)).toBe(defaultLinkedListElements.indexOf(insertAfterItem) + 1)
  })

  test('Empty: Always false', () => {
    emptyLinkedList.insertAfter(31, () => false)
    // expect(emptyLinkedList).not.toContain(1)
    expect(emptyLinkedList.length).toBe(0)
  })
  test('NonEmpty: Always false', () => {
    nonEmptyLinkedList.insertAfter(31, () => false)
    expect(nonEmptyLinkedList).not.toContain(1)
    expect(nonEmptyLinkedList.length).toBe(defaultLinkedListElements.length)
  })
})

describe('FindNodes', () => {
  test('Empty: always true', () => {
    expect(emptyLinkedList.findNode(() => true)).toBe(undefined)
  })
  test('NonEmpty: always true', () => {
    const node = nonEmptyLinkedList.findNode(() => true)
    expect(node?.data).toBe(nonEmptyLinkedList.peekHead())
    expect(node?.data).toBe(defaultLinkedListElements[0])
  })
  test('Empty: always false', () => {
    expect(emptyLinkedList.findNode(() => true)).toBe(undefined)
  })
  test('NonEmpty: always false', () => {
    expect(nonEmptyLinkedList.findNode(() => false)).toBe(undefined)
  })
  test('NonEmpty: valid condition', () => {
    const node = nonEmptyLinkedList.findNode(node => node.data === defaultLinkedListElements[1])
    expect(node?.data).toBe(defaultLinkedListElements[1])
  })
  test('NonEmpty: invalid condition', () => {
    const node = nonEmptyLinkedList.findNode(node => node.data === 100)
    expect(node).toBe(undefined)
  })
})

describe('Iterable', () => {
  test('Empty', () => {
    const linkedListArr = Array.from(emptyLinkedList)
    expect(linkedListArr.length).toBe(0)
    expect(emptyLinkedList).not.toContain(100)
  })
  test('NonEmpty', () => {
    const linkedListArr = Array.from(nonEmptyLinkedList)
    expect(linkedListArr.length).toBe(nonEmptyLinkedList.length)
    expect(nonEmptyLinkedList).not.toContain(100)
  })
})
