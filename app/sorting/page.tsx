"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SortingVisualization from "@/components/sorting-visualization"
import CodeBlock from "@/components/code-block"
import ComplexityTable from "@/components/complexity-table"

const sortingAlgorithms = [
  {
    name: "Bubble Sort",
    description:
      "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order",
    longDescription: `
      Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.

      Key characteristics of Bubble Sort:
      1. Simple implementation
      2. O(n^2) time complexity
      3. Stable sort (does not change the relative order of equal elements)
      4. In-place algorithm (requires only a constant amount O(1) of additional memory space)

      Bubble Sort is particularly useful:
      - For educational purposes to introduce the concept of sorting algorithms
      - When simplicity is more important than efficiency
      - For small lists where the inefficiency is less noticeable

      However, it is not suitable for large datasets due to its quadratic time complexity.
    `,
    visualization: "bubble-sort",
    code: `
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
    `,
    timeComplexity: [
      { operation: "Best Case", complexity: "O(n)" },
      { operation: "Average Case", complexity: "O(n^2)" },
      { operation: "Worst Case", complexity: "O(n^2)" },
    ],
    spaceComplexity: "O(1)",
  },
  {
    name: "Quick Sort",
    description: "An efficient, in-place sorting algorithm that uses divide and conquer strategy to sort elements",
    longDescription: `
      Quick Sort is a highly efficient sorting algorithm that uses a divide-and-conquer strategy. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.

      Key characteristics of Quick Sort:
      1. Efficient for large datasets
      2. Average time complexity of O(n log n)
      3. In-place sorting algorithm
      4. Unstable sort (may change the relative order of equal elements)

      Quick Sort is particularly useful:
      - When average-case performance is important
      - For sorting large datasets
      - When in-place sorting is required to conserve memory

      The efficiency of Quick Sort can vary depending on the choice of the pivot element. A good pivot selection (e.g., median-of-three) can help avoid the worst-case scenario.
    `,
    visualization: "quick-sort",
    code: `
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
    `,
    timeComplexity: [
      { operation: "Best Case", complexity: "O(n log n)" },
      { operation: "Average Case", complexity: "O(n log n)" },
      { operation: "Worst Case", complexity: "O(n^2)" },
    ],
    spaceComplexity: "O(log n) to O(n)",
  },
  // Add more sorting algorithms here (e.g., Merge Sort, Insertion Sort)
]

export default function SortingPage() {
  const [activeSorting, setActiveSorting] = useState(sortingAlgorithms[0].name)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sorting Algorithms</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Explore various sorting algorithms, their implementations, and use cases. Efficient sorting is a fundamental
        operation in computer science and is crucial for optimizing data processing and search operations.
      </p>
      <Tabs defaultValue={sortingAlgorithms[0].name} onValueChange={setActiveSorting}>
        <TabsList className="mb-4">
          {sortingAlgorithms.map((algorithm) => (
            <TabsTrigger key={algorithm.name} value={algorithm.name}>
              {algorithm.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {sortingAlgorithms.map((algorithm) => (
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
                    <SortingVisualization type={algorithm.visualization} />
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
    </div>
  )
}

