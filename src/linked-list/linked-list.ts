class Node<T> {
  #data: T
  next: Node<T> | null = null

  constructor(data: T) {
    this.#data = data
  }

  get data() {
    return this.#data
  }
}

type Predicate<T> = (node: Node<T>, idx: number, l: LinkedList<T>) => boolean

export class LinkedList<T = unknown> implements Iterable<T> {
  #head: Node<T> | null = null
  #tail: Node<T> | null = null
  #size = 0

  constructor(elements?: Iterable<T>) {
    if (elements) {
      for (const element of elements) {
        this.push(element)
      }
    }
  }

  push(element: T): void {
    const node = new Node(element)
    if (this.#tail) {
      this.#tail.next = node
    } else {
      this.#head = node
    }
    this.#tail = node
    this.#size += 1
  }

  pop(): T | undefined {
    throw new Error('User Doubly Linked List for better performance')
  }

  shift(element: T): void {
    const node = new Node(element)
    if (this.#head) {
      node.next = this.#head
    } else {
      this.#tail = node
    }
    this.#head = node
    this.#size += 1
  }

  unshift(): T | undefined {
    if (!this.#head) {
      return undefined
    }
    const data = this.#head.data
    this.#head = this.#head.next
    this.#size -= 1
    return data
  }

  findNode(predicate: Predicate<T>): Node<T> | undefined {
    let node = this.#head
    for (let idx = 0; node !== null; idx += 1, node = node.next) {
      if (predicate(node, idx, this)) {
        return node
      }
    }
    return undefined
  }

  insertAfter(element: T, predicate: Predicate<T>) {
    let currNode = this.#head
    let counter = -1
    while (currNode) {
      counter += 1
      if (predicate(currNode, counter, this)) {
        this.#insertAfterNode(element, currNode)
        break
      }
      currNode = currNode.next
    }
  }

  #insertAfterNode(element: T, prevNode: Node<T>): void {
    const node = new Node(element)
    node.next = prevNode.next
    prevNode.next = node

    if (!node.next) {
      // prev node was tail
      this.#tail = node
    }
    this.#size += 1
  }

  peekHead(): T | undefined {
    if (!this.#head) return undefined
    return this.#head.data
  }
  peekTail(): T | undefined {
    if (!this.#tail) return undefined
    return this.#tail.data
  }

  get length() {
    return this.#size
  }

  *[Symbol.iterator]() {
    let currNode = this.#head
    while (currNode) {
      yield currNode.data
      currNode = currNode.next
    }
  }
}
