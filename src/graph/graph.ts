import { LinkedList } from '../linked-list'
import { Queue } from '../queue'
import { Stack } from '../stack'

export type GraphTraversalCallback<T> = (element: T) => void

export class Graph<T> {
  #verticesCount = 0
  #adjacencyList: Map<T, LinkedList<T>>
  constructor() {
    this.#adjacencyList = new Map<T, LinkedList<T>>()
  }

  addVertex(vertex: T) {
    this.#adjacencyList.set(vertex, new LinkedList<T>())
    this.#verticesCount += 1
  }

  addEdge(vertex1: T, vertex2: T) {
    if (!this.#adjacencyList.has(vertex1)) {
      this.addVertex(vertex1)
    }
    if (!this.#adjacencyList.has(vertex2)) {
      this.addVertex(vertex2)
    }

    const connection1 = this.#adjacencyList.get(vertex1)
    const connection2 = this.#adjacencyList.get(vertex2)

    if (connection1 && connection2) {
      connection1.push(vertex2)
      connection2.push(vertex1)
    }
  }

  addDirected(vertexFrom: T, vertexTo: T) {
    if (!this.#adjacencyList.has(vertexFrom)) {
      this.addVertex(vertexFrom)
    }
    if (!this.#adjacencyList.has(vertexTo)) {
      this.addVertex(vertexTo)
    }

    const connections = this.#adjacencyList.get(vertexFrom)
    if (connections) {
      connections.push(vertexTo)
    }
  }

  breadthFirstTraversal(callback: GraphTraversalCallback<T>): void {
    if (typeof callback !== 'function') throw new Error('Callback must be a function')
    if (this.#verticesCount === 0) return undefined
    const queue = new Queue<T>()
    const isVisitedMap = new Map<T, boolean>()
    let current = [...this.#adjacencyList.keys()][0]

    while (current) {
      if (!isVisitedMap.get(current)) {
        isVisitedMap.set(current, true)
        callback(current)
        const nodes = this.#adjacencyList.get(current)
        if (nodes) {
          for (const node of nodes) {
            queue.enqueue(node)
          }
        }
      }
      // if visited ignore.
      current = queue.dequeue()
    }
  }

  depthFirstTraversal(callback: GraphTraversalCallback<T>): void {
    if (this.#verticesCount === 0) return undefined
    const stack = new Stack<T>()
    const isVisitedMap = new Map<T, boolean>()
    let current: T | undefined | null = [...this.#adjacencyList.keys()][0]
    while (stack.length || current) {
      if (!current) {
        current = stack.pop()
        continue
      }
      if (!isVisitedMap.get(current)) {
        callback(current)
        isVisitedMap.set(current, true)
      }
      const next = this.#getFirstNonVisitedNodeFor(current, isVisitedMap)
      if (next) stack.push(next)
      current = next
    }
  }

  #getFirstNonVisitedNodeFor(vertex: T, isVisitedMap: Map<T, boolean>) {
    const connections = this.#adjacencyList.get(vertex)
    if (connections) {
      for (const connection of connections) {
        if (!isVisitedMap.get(connection)) return connection
      }
    }
    return null
  }

  get length() {
    return this.#verticesCount
  }
}
