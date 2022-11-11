export class Stack<T = unknown> implements Iterable<T> {
  #data: T[] = []

  constructor(elements?: Iterable<T>) {
    if (elements) {
      for (const element of elements) {
        this.push(element)
      }
    }
  }

  *[Symbol.iterator]() {
    for (const element of this.#data) {
      yield element
    }
  }

  push(element: T): void {
    this.#data.push(element)
  }

  pop(): T | undefined {
    return this.#data.pop()
  }

  peek(): T | undefined {
    if (this.#data.length) {
      return this.#data[this.#data.length - 1]
    }
    return undefined
  }

  get length() {
    return this.#data.length
  }
}
