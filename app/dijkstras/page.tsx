"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DijkstrasVisualization from "@/components/dijkstras-visualization"
import CodeBlock from "@/components/code-block"
import ComplexityTable from "@/components/complexity-table"

const dijkstrasAlgorithm = {
  name: "Dijkstra's Algorithm",
  description: "An algorithm for finding the shortest paths between nodes in a graph",
  longDescription: `
    Dijkstra's algorithm is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge weights, producing a shortest path tree. This algorithm is widely used in routing and as a subroutine in other graph algorithms.

    Key steps of Dijkstra's Algorithm:
    1. Initialize distances: Set the distance to the start node as 0 and all other nodes as infinity.
    2. Create a priority queue and add all nodes with their distances.
    3. While the priority queue is not empty:
       a. Extract the node with the minimum distance.
       b. For each neighbor of the extracted node:
          - Calculate the distance through the current node.
          - If this distance is less than the previously recorded distance, update it.
    4. After the algorithm finishes, we have the shortest distances from the start node to all other nodes.

    Dijkstra's Algorithm uses a priority queue to efficiently select the unvisited node with the lowest distance. This makes it more efficient than a simple implementation that would search through all nodes every time.

    Applications of Dijkstra's Algorithm:
    - GPS navigation systems
    - Network routing protocols
    - Finding shortest paths in social networks
    - Modeling traffic in transportation networks

    Dijkstra's Algorithm works well for graphs with non-negative edge weights. For graphs with negative edge weights, other algorithms like the Bellman-Ford algorithm are more suitable.
  `,
  visualization: "dijkstras",
  code: `
import heapq

def dijkstra(graph, start):
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_distance, current_node = heapq.heappop(pq)
        
        if current_distance > distances[current_node]:
            continue
        
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances

# Example usage
graph = {
    'A': {'B': 4, 'C': 2},
    'B': {'D': 3, 'E': 1},
    'C': {'B': 1, 'D': 5},
    'D': {'E': 2},
    'E': {}
}

start_node = 'A'
shortest_distances = dijkstra(graph, start_node)
print(f"Shortest distances from {start_node}: {shortest_distances}")
  `,
  timeComplexity: [
    { operation: "Overall", complexity: "O((V + E) log V)" },
    { operation: "Extract-Min", complexity: "O(log V)" },
    { operation: "Decrease-Key", complexity: "O(log V)" },
  ],
  spaceComplexity: "O(V), where V is the number of vertices",
}

export default function DijkstrasPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dijkstra's Algorithm</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Explore Dijkstra's Algorithm, its implementation, and use cases. This algorithm is fundamental for finding the
        shortest paths in weighted graphs with non-negative edge weights.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>{dijkstrasAlgorithm.name}</CardTitle>
          <CardDescription>{dijkstrasAlgorithm.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Visualization</h3>
              <DijkstrasVisualization />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Implementation</h3>
              <CodeBlock code={dijkstrasAlgorithm.code} language="python" />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Detailed Explanation</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{dijkstrasAlgorithm.longDescription}</p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Time and Space Complexity</h3>
            <ComplexityTable
              timeComplexity={dijkstrasAlgorithm.timeComplexity}
              spaceComplexity={dijkstrasAlgorithm.spaceComplexity}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

