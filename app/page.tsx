import PrimsVisualization from "@/components/prims-visualization"
import PythonImplementation from "@/components/python-implementation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to Data Structures and Algorithms</h1>
        <p className="mt-3 text-2xl">Start your journey to master DSA concepts</p>
        <div className="flex mt-6">
          <Link href="/introduction" passHref>
            <Button size="lg">Get Started</Button>
          </Link>
        </div>

        <div className="container mx-auto px-4 py-8 mt-12">
          <h1 className="text-3xl font-bold text-center mb-6 text-slate-800 dark:text-slate-100">
            Prim's Algorithm Visualization
          </h1>
          <p className="text-lg text-center mb-8 text-slate-600 dark:text-slate-300">
            Interactive visualization of Prim's Algorithm using Min-Heap to find the Minimum Spanning Tree
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Graph Visualization</h2>
              <PrimsVisualization />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Python Implementation</h2>
              <PythonImplementation />
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              How Prim's Algorithm Works
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <h3>Algorithm Steps:</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Start with any vertex as the initial MST</li>
                <li>Initialize a min-heap with all edges connecting the MST to vertices not in MST</li>
                <li>
                  While there are vertices not in the MST:
                  <ul className="list-disc pl-6 mt-2">
                    <li>Extract the minimum weight edge from the min-heap</li>
                    <li>If the edge connects to a vertex already in MST, discard it</li>
                    <li>Otherwise, add the edge to the MST and the new vertex to the MST set</li>
                    <li>Add all edges from the new vertex to the min-heap (if they connect to vertices not in MST)</li>
                  </ul>
                </li>
              </ol>

              <h3 className="mt-6">Min-Heap Usage:</h3>
              <p>
                A min-heap is used to efficiently extract the edge with minimum weight at each step. The heap stores
                edges as (weight, source, destination) tuples, allowing O(log n) extraction of the minimum edge and
                O(log n) insertion of new edges.
              </p>

              <h3 className="mt-6">Time Complexity:</h3>
              <p>
                The time complexity of Prim's algorithm using a min-heap is O(E log V), where E is the number of edges
                and V is the number of vertices in the graph.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Algorithm Comparison</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <th className="border p-3 text-left">Feature</th>
                    <th className="border p-3 text-left">Prim's Algorithm</th>
                    <th className="border p-3 text-left">Kruskal's Algorithm</th>
                    <th className="border p-3 text-left">Dijkstra's Algorithm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3 font-medium">Purpose</td>
                    <td className="border p-3">Find Minimum Spanning Tree</td>
                    <td className="border p-3">Find Minimum Spanning Tree</td>
                    <td className="border p-3">Find Shortest Path</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-medium">Approach</td>
                    <td className="border p-3">Grow a single tree from a starting vertex</td>
                    <td className="border p-3">Sort edges by weight and add if no cycle forms</td>
                    <td className="border p-3">Find shortest path from source to all vertices</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-medium">Data Structure</td>
                    <td className="border p-3">Min-Heap (Priority Queue)</td>
                    <td className="border p-3">Disjoint Set (Union-Find)</td>
                    <td className="border p-3">Min-Heap (Priority Queue)</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-medium">Time Complexity</td>
                    <td className="border p-3">O(E log V)</td>
                    <td className="border p-3">O(E log E) or O(E log V)</td>
                    <td className="border p-3">O(E log V)</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-medium">Best For</td>
                    <td className="border p-3">Dense graphs</td>
                    <td className="border p-3">Sparse graphs</td>
                    <td className="border p-3">Finding shortest paths</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-medium">Key Advantage</td>
                    <td className="border p-3">Efficient for dense graphs with many edges</td>
                    <td className="border p-3">Simpler implementation</td>
                    <td className="border p-3">Works with non-negative edge weights</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Real-World Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Network Design</h3>
                <p className="text-sm">
                  Designing minimum-cost networks for telecommunications, electrical grids, water supply, and
                  transportation systems.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Cluster Analysis</h3>
                <p className="text-sm">
                  Used in data mining and machine learning for clustering algorithms like single-linkage clustering.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Image Processing</h3>
                <p className="text-sm">
                  Applied in image segmentation and computer vision to identify regions of interest.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Circuit Design</h3>
                <p className="text-sm">Used in VLSI design to minimize wire length and power consumption.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Approximation Algorithms</h3>
                <p className="text-sm">
                  Used as a building block for approximation algorithms for NP-hard problems like the Traveling Salesman
                  Problem.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Game Development</h3>
                <p className="text-sm">Used in procedural map generation and pathfinding in video games.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">Made by Praise Masunga</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

