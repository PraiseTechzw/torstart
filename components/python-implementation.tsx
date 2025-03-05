"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Play, Code, BookOpen } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const primsAlgorithmCode = `import heapq

class Graph:
    def __init__(self):
        self.vertices = {}
        
    def add_vertex(self, vertex):
        if vertex not in self.vertices:
            self.vertices[vertex] = {}
            
    def add_edge(self, src, dest, weight):
        # Add vertices if they don't exist
        self.add_vertex(src)
        self.add_vertex(dest)
        
        # Add edges (undirected graph)
        self.vertices[src][dest] = weight
        self.vertices[dest][src] = weight
    
    def prims_mst(self, start_vertex=None):
        """
        Implements Prim's algorithm using a min-heap to find the MST
        """
        if not self.vertices:
            return [], 0
            
        # If no start vertex specified, use the first one
        if start_vertex is None:
            start_vertex = list(self.vertices.keys())[0]
            
        # Track visited vertices
        mst_vertices = {start_vertex}
        
        # Track edges in the MST
        mst_edges = []
        
        # Track total weight of MST
        total_weight = 0
        
        # Min-heap to store edges (weight, src, dest)
        min_heap = []
        
        # Add all edges from start vertex to min-heap
        for neighbor, weight in self.vertices[start_vertex].items():
            heapq.heappush(min_heap, (weight, start_vertex, neighbor))
            
        print(f"Starting at vertex {start_vertex}")
        print(f"Initial min-heap: {min_heap}")
        
        # Continue until all vertices are in MST or heap is empty
        while min_heap and len(mst_vertices) < len(self.vertices):
            # Extract minimum weight edge
            weight, src, dest = heapq.heappop(min_heap)
            
            print(f"Popped from heap: ({weight}, {src}, {dest})")
            
            # If destination already in MST, skip
            if dest in mst_vertices:
                print(f"Vertex {dest} already in MST, skipping")
                continue
                
            # Add edge to MST
            mst_edges.append((src, dest, weight))
            mst_vertices.add(dest)
            total_weight += weight
            
            print(f"Added edge {src}-{dest} with weight {weight} to MST")
            print(f"MST vertices: {mst_vertices}")
            print(f"MST edges: {mst_edges}")
            
            # Add all edges from new vertex to min-heap
            for neighbor, edge_weight in self.vertices[dest].items():
                if neighbor not in mst_vertices:
                    heapq.heappush(min_heap, (edge_weight, dest, neighbor))
                    print(f"Added edge ({edge_weight}, {dest}, {neighbor}) to heap")
            
            print(f"Current min-heap: {min_heap}")
            print("-" * 50)
            
        return mst_edges, total_weight

# Example usage
def main():
    g = Graph()
    
    # Add edges (src, dest, weight)
    g.add_edge('A', 'B', 7)
    g.add_edge('A', 'D', 5)
    g.add_edge('B', 'C', 8)
    g.add_edge('B', 'D', 9)
    g.add_edge('B', 'E', 7)
    g.add_edge('C', 'E', 5)
    g.add_edge('D', 'E', 15)
    g.add_edge('D', 'F', 6)
    g.add_edge('E', 'F', 8)
    g.add_edge('E', 'G', 9)
    g.add_edge('F', 'G', 11)
    
    # Run Prim's algorithm
    mst_edges, total_weight = g.prims_mst('A')
    
    print("\\nMinimum Spanning Tree:")
    for src, dest, weight in mst_edges:
        print(f"{src} -- {dest} : {weight}")
    print(f"Total MST weight: {total_weight}")

if __name__ == "__main__":
    main()
`

const minHeapImplementationCode = `class MinHeap:
    def __init__(self):
        self.heap = []
        self.size = 0
        self.position = {}  # To track positions of vertices in heap
    
    def is_empty(self):
        return self.size == 0
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left_child(self, i):
        return 2 * i + 1
    
    def right_child(self, i):
        return 2 * i + 2
    
    def swap(self, i, j):
        # Update positions
        self.position[self.heap[i][1]] = j
        self.position[self.heap[j][1]] = i
        
        # Swap elements
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
    
    def heapify_up(self, i):
        while i > 0 and self.heap[self.parent(i)][0] > self.heap[i][0]:
            self.swap(i, self.parent(i))
            i = self.parent(i)
    
    def heapify_down(self, i):
        smallest = i
        left = self.left_child(i)
        right = self.right_child(i)
        
        if left < self.size and self.heap[left][0] < self.heap[smallest][0]:
            smallest = left
            
        if right < self.size and self.heap[right][0] < self.heap[smallest][0]:
            smallest = right
            
        if smallest != i:
            self.swap(i, smallest)
            self.heapify_down(smallest)
    
    def insert(self, key, vertex):
        """Insert (key, vertex) pair into the heap"""
        self.heap.append([key, vertex])
        self.position[vertex] = self.size
        self.size += 1
        self.heapify_up(self.size - 1)
    
    def extract_min(self):
        """Extract the minimum key-vertex pair"""
        if self.is_empty():
            return None
            
        min_item = self.heap[0]
        
        # Move last item to root and heapify down
        last_item = self.heap[self.size - 1]
        self.heap[0] = last_item
        self.position[last_item[1]] = 0
        
        # Remove the extracted vertex from position map
        del self.position[min_item[1]]
        
        self.size -= 1
        self.heap.pop()
        
        if self.size > 0:
            self.heapify_down(0)
            
        return min_item
    
    def decrease_key(self, vertex, new_key):
        """Decrease the key of a vertex"""
        if vertex not in self.position:
            return
            
        i = self.position[vertex]
        
        if new_key < self.heap[i][0]:
            self.heap[i][0] = new_key
            self.heapify_up(i)
    
    def contains(self, vertex):
        """Check if vertex is in the heap"""
        return vertex in self.position
    
    def get_key(self, vertex):
        """Get the key of a vertex"""
        if vertex not in self.position:
            return float('inf')
            
        i = self.position[vertex]
        return self.heap[i][0]

# Example usage for Prim's algorithm with custom MinHeap
def prims_algorithm_with_custom_heap(graph, start_vertex):
    """
    Implements Prim's algorithm using our custom MinHeap
    
    graph: Dictionary of dictionaries representing adjacency list with weights
    start_vertex: Starting vertex for MST
    """
    # Initialize result
    mst = []
    mst_weight = 0
    
    # Set of vertices included in MST
    mst_set = {start_vertex}
    
    # Initialize min heap
    min_heap = MinHeap()
    
    # Add all vertices with infinite key except start_vertex
    for vertex in graph:
        if vertex != start_vertex:
            min_heap.insert(float('inf'), vertex)
    
    # Add start_vertex with key 0
    min_heap.insert(0, start_vertex)
    
    # Process vertices
    while not min_heap.is_empty():
        # Extract vertex with minimum key
        key, u = min_heap.extract_min()
        
        # If vertex is not start_vertex, add edge to MST
        if u != start_vertex:
            # Find the parent vertex that connects to u
            for v in mst_set:
                if v in graph and u in graph[v]:
                    mst.append((v, u, graph[v][u]))
                    mst_weight += graph[v][u]
                    break
        
        # Add u to MST set
        mst_set.add(u)
        
        # Update keys of adjacent vertices
        for v, weight in graph[u].items():
            if v not in mst_set and min_heap.contains(v):
                if weight < min_heap.get_key(v):
                    min_heap.decrease_key(v, weight)
    
    return mst, mst_weight

# Example usage
def main():
    # Create graph as adjacency list with weights
    graph = {
        'A': {'B': 7, 'D': 5},
        'B': {'A': 7, 'C': 8, 'D': 9, 'E': 7},
        'C': {'B': 8, 'E': 5},
        'D': {'A': 5, 'B': 9, 'E': 15, 'F': 6},
        'E': {'B': 7, 'C': 5, 'D': 15, 'F': 8, 'G': 9},
        'F': {'D': 6, 'E': 8, 'G': 11},
        'G': {'E': 9, 'F': 11}
    }
    
    mst, total_weight = prims_algorithm_with_custom_heap(graph, 'A')
    
    print("Minimum Spanning Tree:")
    for src, dest, weight in mst:
        print(f"{src} -- {dest} : {weight}")
    print(f"Total MST weight: {total_weight}")

if __name__ == "__main__":
    main()
`

const visualizationCode = `import matplotlib.pyplot as plt
import networkx as nx
import heapq
import time
from IPython.display import clear_output

class GraphVisualizer:
    def __init__(self, graph):
        self.graph = graph
        self.G = nx.Graph()
        
        # Add vertices and edges to NetworkX graph
        for vertex in graph.vertices:
            self.G.add_node(vertex)
        
        for src in graph.vertices:
            for dest, weight in graph.vertices[src].items():
                if src < dest:  # Avoid adding edges twice
                    self.G.add_edge(src, dest, weight=weight)
        
        # Set positions for visualization
        self.pos = nx.spring_layout(self.G, seed=42)
        
    def visualize_step(self, mst_vertices, mst_edges, current_edge=None, title=None):
        """Visualize current state of MST algorithm"""
        plt.figure(figsize=(10, 8))
        
        # Draw all edges with light gray
        nx.draw_networkx_edges(
            self.G, self.pos, 
            edgelist=[(u, v) for u, v in self.G.edges()],
            width=1.0, alpha=0.3, edge_color='gray'
        )
        
        # Draw MST edges with green
        if mst_edges:
            mst_edge_list = [(e[0], e[1]) for e in mst_edges]
            nx.draw_networkx_edges(
                self.G, self.pos, 
                edgelist=mst_edge_list,
                width=2.0, alpha=1.0, edge_color='green'
            )
        
        # Draw current edge with orange if provided
        if current_edge:
            nx.draw_networkx_edges(
                self.G, self.pos, 
                edgelist=[(current_edge[0], current_edge[1])],
                width=2.5, alpha=1.0, edge_color='orange'
            )
        
        # Draw all nodes
        nx.draw_networkx_nodes(
            self.G, self.pos, 
            nodelist=list(self.G.nodes()),
            node_size=500, node_color='lightblue', alpha=0.8
        )
        
        # Draw MST nodes with green
        nx.draw_networkx_nodes(
            self.G, self.pos, 
            nodelist=mst_vertices,
            node_size=500, node_color='green', alpha=0.8
        )
        
        # Draw edge labels (weights)
        edge_labels = nx.get_edge_attributes(self.G, 'weight')
        nx.draw_networkx_edge_labels(self.G, self.pos, edge_labels=edge_labels)
        
        # Draw node labels
        nx.draw_networkx_labels(self.G, self.pos, font_weight='bold')
        
        plt.title(title or "Prim's Algorithm Visualization")
        plt.axis('off')
        plt.tight_layout()
        plt.show()

def visualize_prims_algorithm(graph, start_vertex=None, delay=1.0):
    """
    Visualize Prim's algorithm step by step
    
    graph: Graph object
    start_vertex: Starting vertex for MST
    delay: Delay between steps in seconds
    """
    if not graph.vertices:
        return [], 0
        
    # If no start vertex specified, use the first one
    if start_vertex is None:
        start_vertex = list(graph.vertices.keys())[0]
        
    # Create visualizer
    visualizer = GraphVisualizer(graph)
    
    # Track visited vertices
    mst_vertices = [start_vertex]
    
    # Track edges in the MST
    mst_edges = []
    
    # Track total weight of MST
    total_weight = 0
    
    # Min-heap to store edges (weight, src, dest)
    min_heap = []
    
    # Visualize initial state
    visualizer.visualize_step(
        mst_vertices, mst_edges, 
        title=f"Starting at vertex {start_vertex}"
    )
    time.sleep(delay)
    
    # Add all edges from start vertex to min-heap
    for neighbor, weight in graph.vertices[start_vertex].items():
        heapq.heappush(min_heap, (weight, start_vertex, neighbor))
    
    # Continue until all vertices are in MST or heap is empty
    while min_heap and len(mst_vertices) < len(graph.vertices):
        # Extract minimum weight edge
        weight, src, dest = heapq.heappop(min_heap)
        
        # Visualize current edge consideration
        visualizer.visualize_step(
            mst_vertices, mst_edges, (src, dest),
            title=f"Considering edge {src}-{dest} with weight {weight}"
        )
        time.sleep(delay)
        
        # If destination already in MST, skip
        if dest in mst_vertices:
            visualizer.visualize_step(
                mst_vertices, mst_edges, (src, dest),
                title=f"Skipping edge {src}-{dest} as {dest} is already in MST"
            )
            time.sleep(delay)
            continue
            
        # Add edge to MST
        mst_edges.append((src, dest, weight))
        mst_vertices.append(dest)
        total_weight += weight
        
        # Visualize after adding edge to MST
        visualizer.visualize_step(
            mst_vertices, mst_edges,
            title=f"Added edge {src}-{dest} with weight {weight} to MST"
        )
        time.sleep(delay)
        
        # Add all edges from new vertex to min-heap
        for neighbor, edge_weight in graph.vertices[dest].items():
            if neighbor not in mst_vertices:
                heapq.heappush(min_heap, (edge_weight, dest, neighbor))
    
    # Visualize final MST
    visualizer.visualize_step(
        mst_vertices, mst_edges,
        title=f"Final MST with total weight {total_weight}"
    )
    
    return mst_edges, total_weight

# Example usage
def main():
    g = Graph()
    
    # Add edges (src, dest, weight)
    g.add_edge('A', 'B', 7)
    g.add_edge('A', 'D', 5)
    g.add_edge('B', 'C', 8)
    g.add_edge('B', 'D', 9)
    g.add_edge('B', 'E', 7)
    g.add_edge('C', 'E', 5)
    g.add_edge('D', 'E', 15)
    g.add_edge('D', 'F', 6)
    g.add_edge('E', 'F', 8)
    g.add_edge('E', 'G', 9)
    g.add_edge('F', 'G', 11)
    
    # Run visualization
    visualize_prims_algorithm(g, 'A', delay=2.0)

if __name__ == "__main__":
    main()
`

export default function PythonImplementation() {
  const [activeTab, setActiveTab] = useState("algorithm")
  const [copied, setCopied] = useState(false)

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col space-y-4">
      <Tabs defaultValue="algorithm" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="algorithm">Prim's Algorithm</TabsTrigger>
          <TabsTrigger value="minheap">Min-Heap Implementation</TabsTrigger>
          <TabsTrigger value="visualization">Visualization Code</TabsTrigger>
        </TabsList>
        <TabsContent value="algorithm" className="relative">
          <pre className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-auto max-h-[400px] text-sm">
            <code className="language-python">{primsAlgorithmCode}</code>
          </pre>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => handleCopy(primsAlgorithmCode)}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </TabsContent>
        <TabsContent value="minheap" className="relative">
          <pre className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-auto max-h-[400px] text-sm">
            <code className="language-python">{minHeapImplementationCode}</code>
          </pre>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => handleCopy(minHeapImplementationCode)}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </TabsContent>
        <TabsContent value="visualization" className="relative">
          <pre className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-auto max-h-[400px] text-sm">
            <code className="language-python">{visualizationCode}</code>
          </pre>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => handleCopy(visualizationCode)}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col space-y-4">
        <div className="flex space-x-2">
          <Button
            className="flex-1"
            onClick={() => {
              const code =
                activeTab === "algorithm"
                  ? primsAlgorithmCode
                  : activeTab === "minheap"
                    ? minHeapImplementationCode
                    : visualizationCode
              handleCopy(code)
            }}
          >
            {copied ? "Copied!" : "Copy Code"}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                <Code className="h-4 w-4 mr-2" />
                Code Explanation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Python Code Explanation</DialogTitle>
                <DialogDescription>Understanding the implementation details</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <Tabs defaultValue="algorithm-exp">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="algorithm-exp">Prim's Algorithm</TabsTrigger>
                    <TabsTrigger value="minheap-exp">Min-Heap</TabsTrigger>
                    <TabsTrigger value="visualization-exp">Visualization</TabsTrigger>
                  </TabsList>

                  <TabsContent value="algorithm-exp" className="space-y-4 mt-4">
                    <h3 className="text-lg font-semibold">Prim's Algorithm Implementation</h3>
                    <p>
                      The implementation uses Python's built-in <code>heapq</code> module to maintain a min-heap of
                      edges. Here's a breakdown of the key components:
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-medium">Graph Class</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Uses an adjacency list representation with a dictionary of dictionaries</li>
                        <li>Each vertex maps to a dictionary of its neighbors and edge weights</li>
                        <li>Supports adding vertices and edges</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">prims_mst Method</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Initializes with a starting vertex</li>
                        <li>Uses a min-heap to store edges as (weight, source, destination) tuples</li>
                        <li>Extracts the minimum weight edge at each step</li>
                        <li>Checks if the edge connects to a vertex already in the MST</li>
                        <li>Adds valid edges to the MST and updates the min-heap</li>
                        <li>Returns the MST edges and total weight</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Key Insight</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        The algorithm always selects the minimum weight edge that connects a vertex in the MST to a
                        vertex outside the MST. This greedy approach ensures that we build the MST with minimum total
                        weight.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="minheap-exp" className="space-y-4 mt-4">
                    <h3 className="text-lg font-semibold">Custom Min-Heap Implementation</h3>
                    <p>
                      The custom MinHeap class provides more control over the heap operations compared to the built-in
                      heapq module. It's particularly useful for implementing the decrease-key operation.
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-medium">Key Operations</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>
                          <strong>insert(key, vertex)</strong>: Adds a new (key, vertex) pair to the heap
                        </li>
                        <li>
                          <strong>extract_min()</strong>: Removes and returns the minimum key-vertex pair
                        </li>
                        <li>
                          <strong>decrease_key(vertex, new_key)</strong>: Decreases the key of a vertex
                        </li>
                        <li>
                          <strong>heapify_up(i)</strong>: Restores heap property by moving an element up
                        </li>
                        <li>
                          <strong>heapify_down(i)</strong>: Restores heap property by moving an element down
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Implementation Details</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Uses an array to store the heap elements</li>
                        <li>Maintains a position map to quickly locate vertices in the heap</li>
                        <li>Implements the standard binary heap operations with O(log n) time complexity</li>
                        <li>Provides helper methods for navigating the heap (parent, left_child, right_child)</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200">Advanced Usage</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        The custom implementation allows for the decrease-key operation, which is essential for more
                        efficient implementations of Prim's algorithm. This operation is not directly available in
                        Python's heapq module.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="visualization-exp" className="space-y-4 mt-4">
                    <h3 className="text-lg font-semibold">Visualization Implementation</h3>
                    <p>
                      The visualization code uses matplotlib and networkx to create step-by-step visual representations
                      of Prim's algorithm.
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-medium">GraphVisualizer Class</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Converts our Graph object to a NetworkX graph</li>
                        <li>Sets up the layout for visualization</li>
                        <li>Provides methods to visualize each step of the algorithm</li>
                        <li>Uses color coding to distinguish MST edges, current edges, and regular edges</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">visualize_prims_algorithm Function</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Runs Prim's algorithm with visualization at each step</li>
                        <li>Shows the current state of the MST</li>
                        <li>Highlights the edge being considered</li>
                        <li>Adds delays between steps for better visualization</li>
                        <li>Shows the final MST with total weight</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
                      <h4 className="font-medium text-green-800 dark:text-green-200">Educational Value</h4>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        This visualization is particularly useful for educational purposes, as it helps students
                        understand how Prim's algorithm works step by step. The color coding and clear labeling make it
                        easy to follow the algorithm's progress.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button variant="outline" asChild>
          <a
            href="https://colab.research.google.com/drive/1-2gv4oeC_fDIvSRmR-lWQeIpWCiKlv5k?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Play className="h-4 w-4 mr-2" />
            Run in Google Colab
          </a>
        </Button>

        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <h3 className="font-medium mb-2 flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            How to Use This Code
          </h3>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>Copy the code for the implementation you want to use</li>
            <li>Paste it into your Python environment (local or online)</li>
            <li>Run the code to see Prim's algorithm in action</li>
            <li>Modify the graph structure to test with different graphs</li>
            <li>For visualization, make sure you have matplotlib and networkx installed</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

