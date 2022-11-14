import { Queue } from '../queue'
import { BinarySearchTreeNode } from './binary-search-tree-node'

type CompareFunction<T> = (a: T, b: T) => number
type TraversalCb<T> = (element: T) => void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultCompareFunction: CompareFunction<any> = (a, b) => {
  if (a === b) return 0
  return a > b ? 1 : -1
}

export class BinarySearchTree<T> {
  #root: BinarySearchTreeNode<T> | null = null
  #compare: CompareFunction<T> = defaultCompareFunction
  #length = 0
  constructor(
    iterable?: Iterable<T>,
    compareFunction: CompareFunction<T> = defaultCompareFunction,
  ) {
    this.#compare = compareFunction
    if (iterable) {
      for (const element of iterable) {
        this.insert(element)
      }
    }
  }

  insert(element: T): void {
    const node = new BinarySearchTreeNode(element)
    if (!this.#root) {
      this.#root = node
    } else {
      this.#insertNodeAt(this.#root, node)
    }
    this.#length += 1
  }

  #insertNodeAt(parentNode: BinarySearchTreeNode<T>, node: BinarySearchTreeNode<T>) {
    if (this.#compare(parentNode.data, node.data) > 0) {
      // Parent value is greater than New Node
      if (!parentNode.left) {
        parentNode.left = node
      } else {
        this.#insertNodeAt(parentNode.left, node)
      }
    } else {
      if (!parentNode.right) {
        parentNode.right = node
      } else {
        this.#insertNodeAt(parentNode.right, node)
      }
    }
  }

  remove(element: T): boolean {
    const isOperationSuccessful = this.#removeNode(this.#root, element)
    if (isOperationSuccessful) {
      this.#length -= 1
    }
    return isOperationSuccessful
  }

  #removeNode(node: BinarySearchTreeNode<T> | null, element: T): boolean {
    if (!node) return false
    const comparatorValue = this.#compare(node.data, element)
    if (comparatorValue > 0) {
      return this.#removeNode(node.left, element)
    }
    if (comparatorValue < 0) {
      return this.#removeNode(node.right, element)
    }

    if (node.left && node.right) {
      // Has both the children
      const minNode = this.#minNode(node.right)
      node.data = minNode.data
      return this.#removeNode(node.right, minNode.data)
    }

    if (node.isLeaf) {
      // Has No Children
      if (node.parent) {
        return this.#replaceNodeChild(node.parent, node.data, null)
      } else {
        this.#root = null
        return true
      }
    }

    // If it has one child
    const child = node.left || node.right
    if (child) {
      if (node.parent) {
        return this.#replaceNodeChild(node.parent, node.data, child)
      }
      this.#root = child
      child.parent = null
      return true
    }

    return false
  }

  #replaceNodeChild(
    node: BinarySearchTreeNode<T>,
    toReplaceElement: T,
    replacementNode: BinarySearchTreeNode<T> | null,
  ): boolean {
    if (node.left && this.#compare(node.left.data, toReplaceElement) === 0) {
      node.left.parent = null
      node.left = replacementNode
      return true
    }
    if (node.right && this.#compare(node.right.data, toReplaceElement) === 0) {
      node.right.parent = null
      node.right = replacementNode
      return true
    }
    return false
  }

  inOrderTraversal(cb: TraversalCb<T>, node: BinarySearchTreeNode<T> | null = this.#root) {
    if (node !== null) {
      this.inOrderTraversal(cb, node.left)
      cb(node.data)
      this.inOrderTraversal(cb, node.right)
    }
  }

  preOrderTraversal(cb: TraversalCb<T>, node: BinarySearchTreeNode<T> | null = this.#root) {
    if (node !== null) {
      cb(node.data)
      this.preOrderTraversal(cb, node.left)
      this.preOrderTraversal(cb, node.right)
    }
  }
  postOrderTraversal(cb: TraversalCb<T>, node: BinarySearchTreeNode<T> | null = this.#root) {
    if (node !== null) {
      this.postOrderTraversal(cb, node.left)
      this.postOrderTraversal(cb, node.right)
      cb(node.data)
    }
  }

  breadthFirstTraversal(cb: TraversalCb<T>): void {
    if (!this.#root) return undefined
    const queue = new Queue<BinarySearchTreeNode<T>>()
    let current: BinarySearchTreeNode<T> | null | undefined = this.#root
    while (current) {
      cb(current.data)
      if (current.left) queue.enqueue(current.left)
      if (current.right) queue.enqueue(current.right)
      current = queue.dequeue()
    }
  }

  min(): T | null {
    if (this.#root === null) return null
    return this.#minNode(this.#root).data
  }
  #minNode(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
    while (node.left) node = node.left
    return node
  }

  max(): T | null {
    if (this.#root === null) return null
    return this.#maxNode(this.#root).data
  }
  #maxNode(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
    while (node.right) node = node.right
    return node
  }

  get length() {
    return this.#length
  }
}
