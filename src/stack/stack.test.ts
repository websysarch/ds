import { beforeEach, describe, expect, test } from '@jest/globals'
import { Stack } from './stack'

let emptyStack: Stack<number>
let nonEmptyStack: Stack<number>
const defaultStackIter = [1, 2, 3, 4, 5]

beforeEach(() => {
  emptyStack = new Stack()
  nonEmptyStack = new Stack(defaultStackIter)
})

function evaluateWithArr<T>(stack: Stack<T>, array: T[]) {
  expect(stack.length).toBe(array.length)
}

describe('Initialization', () => {
  test('Empty', () => {
    evaluateWithArr(emptyStack, [])
  })
  test('NonEmpty', () => {
    evaluateWithArr(nonEmptyStack, defaultStackIter)
  })
})

describe('Iterable', () => {
  test('Empty', () => {
    expect(emptyStack).not.toContain(100)
    expect(Array.from(emptyStack).length).toBe(0)
  })
  test('NonEmpty', () => {
    expect(nonEmptyStack).not.toContain(100)
    expect(nonEmptyStack).toContain(defaultStackIter[1])
    expect(Array.from(nonEmptyStack).length).toBe(defaultStackIter.length)
  })
})

describe('Pop', () => {
  test('Empty', () => {
    expect(emptyStack.pop()).toBe(undefined)
  })
  test('NonEmpty', () => {
    expect(nonEmptyStack.pop()).toBe(defaultStackIter[defaultStackIter.length - 1])
  })
})

describe('Peek', () => {
  test('Empty', () => {
    expect(emptyStack.peek()).toBe(undefined)
  })
  test('NonEmpty', () => {
    expect(nonEmptyStack.peek()).toBe(defaultStackIter[defaultStackIter.length - 1])
  })
})

describe('Length', () => {
  test('Empty', () => {
    expect(emptyStack.length).toBe(0)
  })
  test('NonEmpty', () => {
    expect(nonEmptyStack.length).toBe(defaultStackIter.length)
  })
})
