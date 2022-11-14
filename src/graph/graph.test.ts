import { describe, test, beforeEach, expect } from '@jest/globals'
import { Graph } from './graph'

let emptyGraph: Graph<number>
let nonEmptyGraph: Graph<number>
const defaultVertices = [1, 2, 3, 4, 5, 6, 7]
const defaultEdges: [number, number][] = [
  [1, 2],
  [1, 4],
  [4, 5],
  [4, 2],
  [2, 5],
  [2, 3],
  [2, 7],
  [5, 6],
  [5, 3],
  [3, 6],
]

beforeEach(() => {
  emptyGraph = new Graph<number>()
  nonEmptyGraph = new Graph<number>()
  defaultVertices.forEach(vertix => {
    nonEmptyGraph.addVertex(vertix)
  })
  defaultEdges.forEach(edge => {
    nonEmptyGraph.addEdge(...edge)
  })
})

describe('Test length', () => {
  test('Empty', () => {
    expect(emptyGraph.length).toBe(0)
  })
  test('NonEmpty', () => {
    expect(nonEmptyGraph.length).toBe(defaultVertices.length)
  })
})

describe('Traversal', () => {
  test('Empty: Depth First', () => {
    const arr: number[] = []
    emptyGraph.depthFirstTraversal(e => arr.push(e))
    expect(arr.length).toBe(0)
  })
  test('NonEmpty: Depth First', () => {
    const set = new Set<number>()
    nonEmptyGraph.depthFirstTraversal(e => set.add(e))
    expect(set.size).toBe(defaultVertices.length)
    defaultVertices.forEach(vertix => {
      expect(set.has(vertix)).toBe(true)
    })
  })

  test('Empty: Breadth First', () => {
    const arr: number[] = []
    emptyGraph.breadthFirstTraversal(e => arr.push(e))
    expect(arr.length).toBe(0)
  })
  test('NonEmpty: Breadth First', () => {
    const set = new Set<number>()
    nonEmptyGraph.breadthFirstTraversal(e => set.add(e))
    expect(set.size).toBe(defaultVertices.length)
    defaultVertices.forEach(vertix => {
      expect(set.has(vertix)).toBe(true)
    })
  })
})
