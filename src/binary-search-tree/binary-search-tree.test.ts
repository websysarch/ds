import { describe, test, expect, beforeEach } from '@jest/globals'
import { BinarySearchTree } from './binary-search-tree'

let emptyBST: BinarySearchTree<number>
let nonEmptyBST: BinarySearchTree<number>
const defaultBSTArr = [7, 4, 9, 3, 8, 2, 10, 11]
/**
 *            7
 *        4       9
 *    3        8    10
 *  2                   11
 */

beforeEach(() => {
  emptyBST = new BinarySearchTree()
  nonEmptyBST = new BinarySearchTree(defaultBSTArr)
})

describe('Insert', () => {
  test('Empty: Inserted Nodes should also be a BST', () => {
    emptyBST.insert(10)
    expect(emptyBST.length).toBe(1)
    emptyBST.insert(11)
    expect(emptyBST.length).toBe(2)
  })
  test('NonEmpty: Inserted Nodes should also be a BST', () => {
    nonEmptyBST.insert(10)
    expect(nonEmptyBST.length).toBe(defaultBSTArr.length + 1)
    nonEmptyBST.insert(11)
    expect(nonEmptyBST.length).toBe(defaultBSTArr.length + 2)
  })
})

describe('Min', () => {
  test('Empty', () => {
    expect(emptyBST.min()).toBeNull()
  })
  test('NonEmpty', () => {
    expect(nonEmptyBST.min()).toBe(Math.min(...defaultBSTArr))
  })
})

describe('Max', () => {
  test('Empty', () => {
    expect(emptyBST.max()).toBeNull()
  })
  test('NonEmpty', () => {
    expect(nonEmptyBST.max()).toBe(Math.max(...defaultBSTArr))
  })
})

describe('Remove', () => {
  test('Empty', () => {
    expect(emptyBST.remove(2)).toBe(false)
  })
  test('With one child - Valid Removal', () => {
    emptyBST.insert(1)
    expect(emptyBST.remove(1)).toBe(true)
  })
  test('With one child - Invalid removal', () => {
    emptyBST.insert(1)
    expect(emptyBST.remove(2)).toBe(false)
  })
  test('Two Child, and remove root', () => {
    emptyBST.insert(1)
    emptyBST.insert(2)
    expect(emptyBST.remove(1)).toBe(true)
  })
  test('Two Child, and remove invalid', () => {
    emptyBST.insert(1)
    emptyBST.insert(2)
    expect(emptyBST.remove(3)).toBe(false)
  })
  test('NonEmpty: remove root', () => {
    expect(nonEmptyBST.remove(7)).toBe(true)
    expect(nonEmptyBST.length).toBe(defaultBSTArr.length - 1)
  })
  test('NonEmpty: remove leaf', () => {
    expect(nonEmptyBST.remove(2)).toBe(true)
    expect(nonEmptyBST.length).toBe(defaultBSTArr.length - 1)
  })
  test('NonEmpty: remove middle - left node only', () => {
    expect(nonEmptyBST.remove(4)).toBe(true)
    expect(nonEmptyBST.length).toBe(defaultBSTArr.length - 1)
  })
  test('NonEmpty: remove middle - right node only', () => {
    expect(nonEmptyBST.remove(10)).toBe(true)
    expect(nonEmptyBST.length).toBe(defaultBSTArr.length - 1)
  })

  test('NonEmpty: non-existing value', () => {
    expect(nonEmptyBST.remove(200)).toBe(false)
  })
})

describe('Traversal', () => {
  test('In Order', () => {
    const arr: number[] = []
    nonEmptyBST.inOrderTraversal(e => arr.push(e))
    expect(arr.join(',')).toBe([2, 3, 4, 7, 8, 9, 10, 11].join(','))
  })
  test('Pre Order', () => {
    const arr: number[] = []
    nonEmptyBST.preOrderTraversal(e => arr.push(e))
    expect(arr.join(',')).toBe([7, 4, 3, 2, 9, 8, 10, 11].join(','))
  })
  test('Post Order', () => {
    const arr: number[] = []
    nonEmptyBST.postOrderTraversal(e => arr.push(e))
    expect(arr.join(',')).toBe([2, 3, 4, 8, 11, 10, 9, 7].join(','))
  })
})
