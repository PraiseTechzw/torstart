"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import GraphVisualization from "@/components/graph-visualization"
import CodeBlock from "@/components/code-block"
import ComplexityTable from "@/components/complexity-table"

const graphTypes = [
  {
    name: "Undirected Graph",
    description: "A graph in which edges have no orientation",
    longDescription: `
      An undirected graph is a type of graph where edges have no direction. In other words, the relationship between two vertices connected by an edge is symmetric. If there is an edge between vertex A and vertex B, it means both A is connected to B and B is connected to A.

      Key characteristics of Undirected Graphs:
      1. Edges have no direction
      2. The degree of a vertex is the number of edges connected to it
      3. The maximum number of edges in an undirected graph with n vertices is n(n-1)/2

      Undirected graphs are used to model many real-world scenarios, such as:
      - Social networks (friendship relationships)
      - Computer networks
      - Road networks
      - Collaboration networks

      Common operations on undirected graphs include finding connected components, detecting cycles, and finding the shortest path between two vertices.
    `,
    visualization: "undirected-graph",
    code: `
class Graph:
    def __init__(self):
        self.graph = {}

    def add_vertex(self, vertex):
        if vertex not in self.graph:
            self.graph[vertex] = []

    def add_edge(self, vertex1, vertex2):
        if vertex1 not in self.graph:
            self.add_vertex(vertex1)
        if vertex2 not in self.graph:
            self.add_vertex(vertex2)
        self.graph[vertex1].append(vertex2)
        self.graph[vertex2].append(vertex1)

    def remove_edge(self, vertex1, vertex2):
        self.graph[vertex1].remove(vertex2)
        self.graph[vertex2].remove(vertex1)

    def get_vertices(self):
        return list(self.graph.keys())

    def get_edges(self):
        edges = []
        for vertex in self.graph:
            for neighbor in self.graph[vertex]:
                if {vertex, neighbor} not in edges:
                    edges.append({vertex, neighbor})
        return edges
    `,
    timeComplexity: [
      { operation: "Add Vertex", complexity: "O(1)" },
      { operation: "Add Edge", complexity: "O(1)" },
      { operation: "Remove Edge", complexity: "O(degree(v))" },
      { operation: "Get Vertices", complexity: "O(V)" },
      { operation: "Get Edges", complexity: "O(V + E)" },
    ],
    spaceComplexity: "O(V + E), where V is the number of vertices and E is the number of edges",
  },
  // Add more graph types here (e.g., Directed Graph, Weighted Graph)
]

export default function GraphsPage() {
  const [activeGraph, setActiveGraph] = useState(graphTypes[0].name)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Graphs</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Explore various types of graphs, their implementations, and use cases. Graphs are versatile data structures used
        to represent relationships between entities in many real-world applications.
      </p>
      <Tabs defaultValue={graphTypes[0].name} onValueChange={setActiveGraph}>
        <TabsList className="mb-4">
          {graphTypes.map((graph) => (
            <TabsTrigger key={graph.name} value={graph.name}>
              {graph.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {graphTypes.map((graph) => (
          <TabsContent key={graph.name} value={graph.name}>
            <Card>
              <CardHeader>
                <CardTitle>{graph.name}</CardTitle>
                <CardDescription>{graph.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visualization</h3>
                    <GraphVisualization type={graph.visualization} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                    <CodeBlock code={graph.code} language="python" />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Detailed Explanation</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{graph.longDescription}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Time and Space Complexity</h3>
                  <ComplexityTable timeComplexity={graph.timeComplexity} spaceComplexity={graph.spaceComplexity} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

