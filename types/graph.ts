export type Node = {
  id: number
  label: string
  x?: number
  y?: number
}

export type Edge = {
  source: number
  target: number
  weight: number
}

export type Graph = {
  nodes: Node[]
  edges: Edge[]
}

export type AlgorithmStep = {
  mstNodes: number[]
  mstEdges: Edge[]
  currentHeap: { edge: Edge; priority: number }[]
  currentEdge: Edge | null
  description: string
  detailedExplanation: string
  heapOperation: "insert" | "extract" | "update" | "none"
  highlightNodes: number[]
}

