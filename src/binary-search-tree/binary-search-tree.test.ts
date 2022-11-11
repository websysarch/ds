import { describe, test, expect, beforeEach } from '@jest/globals'
import { BinarySearchTree } from './binary-search-tree'

let emptyBST: BinarySearchTree<number>
let nonEmptyBST: BinarySearchTree<number>
const defaultBSTArr = [7, 4, 9, 3, 8, 2]
/**
 *            7
 *        4       9
 *    3        8
 *  2
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

describe('Traversal', () => {
  test('In Order', () => {
    const arr: number[] = []
    nonEmptyBST.inOrderTraversal(e => arr.push(e))
    expect(arr.join(',')).toBe([2, 3, 4, 7, 8, 9].join(','))
  })
  test('Pre Order', () => {
    const arr: number[] = []
    nonEmptyBST.preOrderTraversal(e => arr.push(e))
    expect(arr.join(',')).toBe([7, 4, 3, 2, 9, 8].join(','))
  })
  test('Post Order', () => {
    const arr: number[] = []
    nonEmptyBST.postOrderTraversal(e => arr.push(e))
    expect(arr.join(',')).toBe([2, 3, 4, 8, 9, 7].join(','))
  })
})
