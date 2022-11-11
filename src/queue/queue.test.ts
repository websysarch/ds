import { beforeEach, describe, expect, test } from '@jest/globals'
import { Queue } from './queue'

let emptyQueue: Queue<number>
let nonEmptyQueue: Queue<number>
const defaultQueueItem = [1, 2, 3, 4, 5]

beforeEach(() => {
  emptyQueue = new Queue<number>()
  nonEmptyQueue = new Queue(defaultQueueItem)
})

describe('Initialization', () => {
  test('Empty', () => {
    expect(emptyQueue).toBeInstanceOf(Queue)
  })

  test('NonEmpty', () => {
    expect(nonEmptyQueue).toBeInstanceOf(Queue)
  })
})

describe('Iterable', () => {
  test('Empty', () => {
    expect(emptyQueue[Symbol.iterator]).toBeInstanceOf(Function)
  })
  test('NonEmpty', () => {
    expect(nonEmptyQueue[Symbol.iterator]).toBeInstanceOf(Function)
    defaultQueueItem.forEach(element => {
      expect(nonEmptyQueue).toContain(element)
    })
  })
})

describe('Enqueue', () => {
  test('Empty', () => {
    expect(emptyQueue.length).toBe(0)
    emptyQueue.enqueue(10)
    expect(emptyQueue.length).toBe(1)
  })
  test('NonEmpty', () => {
    expect(nonEmptyQueue.length).toBe(defaultQueueItem.length)
    nonEmptyQueue.enqueue(10)
    expect(nonEmptyQueue.length).toBe(defaultQueueItem.length + 1)
    nonEmptyQueue.enqueue(11)
    expect(nonEmptyQueue.length).toBe(defaultQueueItem.length + 2)
  })
})

describe('Dequeue', () => {
  test('Empty', () => {
    expect(emptyQueue.length).toBe(0)
    expect(emptyQueue.dequeue()).toBe(undefined)
    expect(emptyQueue.length).toBe(0)
    emptyQueue.enqueue(10)
    expect(emptyQueue.dequeue()).toBe(10)
    expect(emptyQueue.length).toBe(0)
  })
  test('NonEmpty', () => {
    expect(nonEmptyQueue.length).toBe(defaultQueueItem.length)
    expect(nonEmptyQueue.dequeue()).toBe(defaultQueueItem[0])
    expect(nonEmptyQueue.length).toBe(defaultQueueItem.length - 1)
    expect(nonEmptyQueue.dequeue()).toBe(defaultQueueItem[1])
    expect(nonEmptyQueue.length).toBe(defaultQueueItem.length - 2)
  })
})

describe('Peek', () => {
  test('Empty', () => {
    expect(emptyQueue.peek()).toBe(undefined)
    emptyQueue.enqueue(10)
    expect(emptyQueue.peek()).toBe(10)
    emptyQueue.enqueue(20)
    expect(emptyQueue.peek()).toBe(10)
  })
})
