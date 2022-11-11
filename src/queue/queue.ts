import { LinkedList } from '../linked-list'

export class Queue<T = unknown> implements Iterable<T> {
  #data = new LinkedList<T>()

  constructor(elements?: Iterable<T>) {
    if (elements) {
      for (const element of elements) {
        this.enqueue(element)
      }
    }
  }

  *[Symbol.iterator]() {
    for (const element of this.#data) {
      yield element
    }
  }

  enqueue(element: T) {
    this.#data.push(element)
  }

  dequeue(): T | undefined {
    return this.#data.unshift()
  }

  peek(): T | undefined {
    return this.#data.peekHead()
  }

  get length() {
    return this.#data.length
  }
}
