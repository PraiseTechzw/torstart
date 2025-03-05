"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AlgorithmVisualization from "@/components/algorithm-visualization"
import CodeBlock from "@/components/code-block"
import ComplexityTable from "@/components/complexity-table"
import Quiz from "@/components/quiz"

const advancedAlgorithms = [
  {
    name: "Dijkstra's Algorithm",
    description: "A graph search algorithm that finds the shortest path between nodes in a graph",
    longDescription: `
      Dijkstra's algorithm is used to find the shortest path between nodes in a graph, which may represent, for example, road networks. It uses a greedy approach to find the optimal solution.

      Key steps:
      1. Initialize distances to all nodes as infinite, except the starting node (distance = 0)
      2. Add the starting node to a priority queue
      3. While the queue is not empty:
         a. Remove the node with the smallest distance from the queue
         b. For each neighbor of this node:
            - Calculate the distance through the current node
            - If this distance is less than the previously recorded distance, update it
      4. Repeat until the destination is reached or the queue is empty
    `,
    visualization: "dijkstra",
    code: `
import heapq

def dijkstra(graph, start, end):
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    previous = {node: None for node in graph}

    while pq:
        current_distance, current_node = heapq.heappop(pq)

        if current_node == end:
            path = []
            while current_node:
                path.append(current_node)
                current_node = previous[current_node]
            return path[::-1], distances[end]

        if current_distance > distances[current_node]:
            continue

        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current_node
                heapq.heappush(pq, (distance, neighbor))

    return None, float('infinity')
    `,
    timeComplexity: [{ operation: "Time Complexity", complexity: "O((V + E) log V)" }],
    spaceComplexity: "O(V)",
  },
  {
    name: "A* Search Algorithm",
    description: "A graph traversal and path search algorithm",
    longDescription: `
      A* (pronounced "A-star") is a graph traversal and path search algorithm that is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency. It uses a best-first search and finds a least-cost path from a given initial node to one goal node (out of one or more possible goals).

      Key features:
      1. Uses a heuristic function to estimate the cost from any given node to the goal
      2. Maintains a priority queue of nodes to be explored
      3. Balances the cost of the path so far and the estimated cost to the goal

      A* is particularly useful in pathfinding and graph traversal, and it's widely used in video games for NPC movement.
    `,
    visualization: "astar",
    code: `
import heapq

def heuristic(a, b):
    # Manhattan distance on a square grid
    return abs(b[0] - a[0]) + abs(b[1] - a[1])

def a_star(graph, start, goal):
    neighbors = [(0,1), (0,-1), (1,0), (-1,0)]
    close_set = set()
    came_from = {}
    gscore = {start:0}
    fscore = {start:heuristic(start, goal)}
    open_set = []
    heapq.heappush(open_set, (fscore[start], start))
    
    while open_set:
        current = heapq.heappop(open_set)[1]
        
        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            path.reverse()
            return path

        close_set.add(current)
        
        for i, j in neighbors:
            neighbor = current[0] + i, current[1] + j
            tentative_g_score = gscore[current] + heuristic(current, neighbor)
            
            if neighbor not in graph:
                continue
                
            if neighbor in close_set and tentative_g_score >= gscore.get(neighbor, 0):
                continue
                
            if tentative_g_score < gscore.get(neighbor, 0) or neighbor not in [i[1]for i in open_set]:
                came_from[neighbor] = current
                gscore[neighbor] = tentative_g_score
                fscore[neighbor] = gscore[neighbor] + heuristic(neighbor, goal)
                heapq.heappush(open_set, (fscore[neighbor], neighbor))
    
    return None
    `,
    timeComplexity: [{ operation: "Time Complexity", complexity: "O(b^d)" }],
    spaceComplexity: "O(b^d)",
  },
]

const advancedAlgorithmsQuiz = [
  {
    question: "What is the main advantage of Dijkstra's algorithm?",
    options: [
      "It always finds the shortest path in any graph",
      "It works on graphs with negative edge weights",
      "It has a linear time complexity",
      "It can find the shortest path between all pairs of nodes",
    ],
    correctAnswer: "It always finds the shortest path in any graph",
  },
  {
    question: "What is the key feature of the A* search algorithm?",
    options: [
      "It uses depth-first search",
      "It uses breadth-first search",
      "It uses a heuristic function to estimate the cost to the goal",
      "It only works on unweighted graphs",
    ],
    correctAnswer: "It uses a heuristic function to estimate the cost to the goal",
  },
]

export default function AdvancedAlgorithmsPage() {
  const [activeAlgorithm, setActiveAlgorithm] = useState(advancedAlgorithms[0].name)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Advanced Algorithms</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Explore advanced algorithms used in various applications of computer science and software engineering.
      </p>
      <Tabs defaultValue={advancedAlgorithms[0].name} onValueChange={setActiveAlgorithm}>
        <TabsList className="mb-4">
          {advancedAlgorithms.map((algorithm) => (
            <TabsTrigger key={algorithm.name} value={algorithm.name}>
              {algorithm.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {advancedAlgorithms.map((algorithm) => (
          <TabsContent key={algorithm.name} value={algorithm.name}>
            <Card>
              <CardHeader>
                <CardTitle>{algorithm.name}</CardTitle>
                <CardDescription>{algorithm.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visualization</h3>
                    <AlgorithmVisualization type={algorithm.visualization} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                    <CodeBlock code={algorithm.code} language="python" />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Detailed Explanation</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{algorithm.longDescription}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Time and Space Complexity</h3>
                  <ComplexityTable
                    timeComplexity={algorithm.timeComplexity}
                    spaceComplexity={algorithm.spaceComplexity}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>Advanced Algorithms Quiz</CardTitle>
          <CardDescription>Test your knowledge of advanced algorithms</CardDescription>
        </CardHeader>
        <CardContent>
          <Quiz questions={advancedAlgorithmsQuiz} />
        </CardContent>
      </Card>
    </div>
  )
}

