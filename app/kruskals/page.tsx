"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import KruskalsVisualization from "@/components/kruskals-visualization"
import CodeBlock from "@/components/code-block"
import ComplexityTable from "@/components/complexity-table"

const kruskalsAlgorithm = {
  name: "Kruskal's Algorithm",
  description:
    "A minimum spanning tree algorithm that finds an edge of the least possible weight that connects any two trees in the forest",
  longDescription: `
    Kruskal's algorithm is a minimum spanning tree algorithm that finds an edge of the least possible weight that connects any two trees in the forest. It is a greedy algorithm in graph theory as it finds a minimum spanning tree for a connected weighted graph adding increasing cost arcs at each step.

    Key steps of Kruskal's Algorithm:
    1. Sort all the edges from low weight to high
    2. Take the edge with the lowest weight and add it to the spanning tree. If adding the edge creates a cycle, then reject this edge.
    3. Keep adding edges until we reach all vertices.

    Kruskal's Algorithm uses a disjoint-set data structure to detect cycles efficiently. This data structure, also known as a union-find data structure, keeps track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets.

    Applications of Kruskal's Algorithm:
    - Designing a least cost network
    - Designing of network of roads, railways, or electrical wiring
    - Clustering analysis
    - Image segmentation in computer vision

    Kruskal's Algorithm is particularly efficient for sparse graphs, where the number of edges is significantly less than the maximum possible number of edges.
  `,
  visualization: "kruskals",
  code: `
class DisjointSet:
    def __init__(self, vertices):
        self.parent = {v: v for v in vertices}
        self.rank = {v: 0 for v in vertices}

    def find(self, item):
        if self.parent[item] != item:
            self.parent[item] = self.find(self.parent[item])
        return self.parent[item]

    def union(self, x, y):
        xroot = self.find(x)
        yroot = self.find(y)
        if self.rank[xroot] < self.rank[yroot]:
            self.parent[xroot] = yroot
        elif self.rank[xroot] > self.rank[yroot]:
            self.parent[yroot] = xroot
        else:
            self.parent[yroot] = xroot
            self.rank[xroot] += 1

def kruskal_mst(graph):
    edges = [(w, u, v) for u in graph for v, w in graph[u].items()]
    edges.sort()
    vertices = list(graph.keys())
    ds = DisjointSet(vertices)
    mst = []

    for w, u, v in edges:
        if ds.find(u) != ds.find(v):
            ds.union(u, v)
            mst.append((u, v, w))

    return mst
  `,
  timeComplexity: [
    { operation: "Overall", complexity: "O(E log E) or O(E log V)" },
    { operation: "Sorting Edges", complexity: "O(E log E)" },
    { operation: "Union-Find Operations", complexity: "O(E α(V))" },
  ],
  spaceComplexity: "O(V + E), where V is the number of vertices and E is the number of edges",
}

export default function KruskalsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Kruskal's Algorithm</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Explore Kruskal's Algorithm, its implementation, and use cases. This algorithm is crucial for finding minimum
        spanning trees in weighted graphs.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>{kruskalsAlgorithm.name}</CardTitle>
          <CardDescription>{kruskalsAlgorithm.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Visualization</h3>
              <KruskalsVisualization />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Implementation</h3>
              <CodeBlock code={kruskalsAlgorithm.code} language="python" />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Detailed Explanation</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{kruskalsAlgorithm.longDescription}</p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Time and Space Complexity</h3>
            <ComplexityTable
              timeComplexity={kruskalsAlgorithm.timeComplexity}
              spaceComplexity={kruskalsAlgorithm.spaceComplexity}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

