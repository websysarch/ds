import { describe, test, expect, beforeEach } from '@jest/globals'
import { BinarySearchTreeNode } from './binary-search-tree-node'

let node: BinarySearchTreeNode<number>

beforeEach(() => {
  node = new BinarySearchTreeNode(10)
})

describe('Initializations', () => {
  test('left with Invalid value', () => {
    expect(() => {
      node.left = 2 as never
    }).toThrow()
  })

  test('right with Invalid value', () => {
    expect(() => {
      node.right = 2 as never
    }).toThrow()
  })

  test('left with Invalid value', () => {
    expect(() => {
      node.parent = 2 as never
    }).toThrow()
  })
})

describe('Default', () => {
  test('parent & root', () => {
    expect(node.parent).toBeNull()
    expect(node.isRoot).toBe(true)
  })

  test('left Child', () => {
    expect(node.left).toBeNull()
  })
  test('right Child', () => {
    expect(node.right).toBeNull()
  })
  test('leaf', () => {
    expect(node.isLeaf).toBe(true)
  })
})

describe('With Parent', () => {
  beforeEach(() => {
    const parentNode = new BinarySearchTreeNode(20)
    parentNode.left = node
  })
  test('parent & root', () => {
    expect(node.parent).toBeInstanceOf(BinarySearchTreeNode)
    expect(node.isRoot).toBe(false)
  })

  test('left Child', () => {
    expect(node.left).toBeNull()
  })
  test('right Child', () => {
    expect(node.right).toBeNull()
  })
  test('leaf', () => {
    expect(node.isLeaf).toBe(true)
  })
})

describe('With Left Child', () => {
  beforeEach(() => {
    node.left = new BinarySearchTreeNode(9)
  })

  test('parent & root', () => {
    expect(node.parent).toBeNull()
    expect(node.isRoot).toBe(true)
  })

  test('left Child', () => {
    expect(node.left).toBeInstanceOf(BinarySearchTreeNode)
  })
  test('right Child', () => {
    expect(node.right).toBeNull()
  })
  test('leaf', () => {
    expect(node.isLeaf).toBe(false)
  })

  test('reset left to null', () => {
    node.left = null
    expect(node.isLeaf).toBe(true)
  })
})

describe('With Right Child', () => {
  beforeEach(() => {
    node.right = new BinarySearchTreeNode(11)
  })

  test('parent & root', () => {
    expect(node.parent).toBeNull()
    expect(node.isRoot).toBe(true)
  })

  test('left Child', () => {
    expect(node.left).toBeNull()
  })
  test('right Child', () => {
    expect(node.right).toBeInstanceOf(BinarySearchTreeNode)
  })
  test('leaf', () => {
    expect(node.isLeaf).toBe(false)
  })
  test('reset right to null', () => {
    node.right = null
    expect(node.isLeaf).toBe(true)
  })
})

describe('With Both Child', () => {
  beforeEach(() => {
    node.left = new BinarySearchTreeNode(9)
    node.right = new BinarySearchTreeNode(11)
  })

  test('parent & root', () => {
    expect(node.parent).toBeNull()
    expect(node.isRoot).toBe(true)
  })

  test('left Child', () => {
    expect(node.left).toBeInstanceOf(BinarySearchTreeNode)
  })
  test('right Child', () => {
    expect(node.right).toBeInstanceOf(BinarySearchTreeNode)
  })
  test('leaf', () => {
    expect(node.isLeaf).toBe(false)
  })
})

describe('With Both Child & Parent', () => {
  beforeEach(() => {
    const parent = new BinarySearchTreeNode(20)
    parent.left = node
    node.left = new BinarySearchTreeNode(9)
    node.right = new BinarySearchTreeNode(11)
  })

  test('parent & root', () => {
    expect(node.parent).toBeInstanceOf(BinarySearchTreeNode)
    expect(node.isRoot).toBe(false)
  })

  test('left Child', () => {
    expect(node.left).toBeInstanceOf(BinarySearchTreeNode)
  })
  test('right Child', () => {
    expect(node.right).toBeInstanceOf(BinarySearchTreeNode)
  })
  test('leaf', () => {
    expect(node.isLeaf).toBe(false)
  })
})
