function validateType<T>(node: BinarySearchTreeNode<T> | null) {
  if (!(node instanceof BinarySearchTreeNode) && node !== null) {
    throw new Error('Expected BinarySearchTreeNode or Null')
  }
}
export class BinarySearchTreeNode<T> {
  data: T

  #parent: BinarySearchTreeNode<T> | null = null
  #left: BinarySearchTreeNode<T> | null = null
  #right: BinarySearchTreeNode<T> | null = null

  constructor(data: T) {
    this.data = data
  }

  get parent() {
    return this.#parent
  }
  set parent(node: BinarySearchTreeNode<T> | null) {
    validateType(node)
    this.#parent = node
  }

  get left() {
    return this.#left
  }
  set left(node: BinarySearchTreeNode<T> | null) {
    validateType(node)
    this.#left = node
    if (node) {
      node.parent = this
    }
  }

  get right() {
    return this.#right
  }
  set right(node: BinarySearchTreeNode<T> | null) {
    validateType(node)
    this.#right = node
    if (node) {
      node.parent = this
    }
  }

  // Utility Methods

  get isRoot(): boolean {
    return this.#parent === null
  }

  get isLeaf(): boolean {
    return this.#left === null && this.#right === null
  }

  get hasParent(): boolean {
    return this.#parent !== null
  }

  get hasLeftChild(): boolean {
    return this.left !== null
  }

  get hasRightChild() {
    return this.#right !== null
  }
}
