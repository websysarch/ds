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
    if (this.#compare(parentNode.data, node.data) >= 1) {
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

  get length() {
    return this.#length
  }
}
