"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AlgorithmVisualization from "@/components/algorithm-visualization"
import CodeBlock from "@/components/code-block"

const algorithms = [
  {
    name: "Algorithm Basics",
    description: "Introduction to algorithms and their fundamental concepts",
    longDescription: `
    Algorithms are step-by-step procedures or formulas for solving problems. They are the foundation of computer science and are essential for efficient problem-solving in various domains.

    Key concepts in algorithms:
    1. Input: The data on which the algorithm operates
    2. Process: The set of steps that transform the input into the desired output
    3. Output: The result produced by the algorithm
    4. Efficiency: How well the algorithm uses computational resources
    5. Correctness: Whether the algorithm solves the problem as required

    When designing algorithms, consider:
    - Correctness: Does the algorithm solve the problem as required?
    - Efficiency: How well does it use computational resources?
    - Simplicity: Is it easy to understand and implement?
    - Generality: Can it be applied to similar problems?
    `,
    visualization: "algorithm-basics",
    code: `
def simple_algorithm(input_data):
    # Step 1: Process the input
    processed_data = process_input(input_data)
    
    # Step 2: Perform the main computation
    result = perform_computation(processed_data)
    
    # Step 3: Format the output
    output = format_output(result)
    
    return output

def process_input(data):
    # Implementation of input processing
    pass

def perform_computation(data):
    # Implementation of main computation
    pass

def format_output(result):
    # Implementation of output formatting
    pass
    `,
    notes: `
    - The visualization shows the basic steps of an algorithm: Problem definition, Input, Process, Output, Efficiency, and Correctness.
    - Each step is crucial for developing effective algorithms.
    - The code example demonstrates a simple algorithm structure with separate functions for input processing, main computation, and output formatting.
    - This modular approach improves readability and maintainability of the code.
    `,
  },
  {
    name: "Algorithm Complexity",
    description: "Understanding the efficiency of algorithms in terms of time and space",
    longDescription: `
    Algorithm complexity refers to the amount of resources (time and space) required by an algorithm to run as a function of the input size. It's crucial for comparing algorithms and predicting their performance on large inputs.

    Key concepts in algorithm complexity:
    1. Time complexity: How the running time increases with input size
    2. Space complexity: How the memory usage increases with input size
    3. Big O notation: Upper bound of growth rate
    4. Best case, average case, and worst case scenarios

    When analyzing complexity:
    - Focus on the dominant terms
    - Consider the input size approaching infinity
    - Look for nested loops and recursive calls
    `,
    visualization: "algorithm-complexity",
    code: `
def constant_time(arr):
    return arr[0]  # O(1)

def linear_time(arr):
    total = 0
    for num in arr:
        total += num
    return total  # O(n)

def quadratic_time(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n):
            print(arr[i], arr[j])  # O(n^2)

def logarithmic_time(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1  # O(log n)
    `,
    notes: `
    - The visualization shows different time complexity curves:
      * O(1): Constant time (green)
      * O(log n): Logarithmic time (blue)
      * O(n): Linear time (orange)
      * O(n log n): Linearithmic time (purple)
      * O(n^2): Quadratic time (red)
      * O(2^n): Exponential time (brown)
    - As the input size (n) increases, the time taken by the algorithm grows according to these curves.
    - The code examples demonstrate algorithms with different time complexities.
    - Understanding these complexities helps in choosing the right algorithm for a given problem and input size.
    `,
  },
  {
    name: "Asymptotic Analysis",
    description: "Evaluating algorithm efficiency as input sizes approach infinity",
    longDescription: `
    Asymptotic analysis is a method of describing the behavior of algorithms as the input size grows towards infinity. It helps in understanding the scalability of algorithms without getting bogged down by hardware-specific details.

    Key concepts in asymptotic analysis:
    1. Big O notation (O): Upper bound
    2. Omega notation (Ω): Lower bound
    3. Theta notation (Θ): Tight bound
    4. Little o notation (o): Upper bound that is not tight
    5. Little omega notation (ω): Lower bound that is not tight

    When performing asymptotic analysis:
    - Ignore constants and lower-order terms
    - Focus on the growth rate of the function
    - Consider the worst-case scenario unless specified otherwise
    `,
    visualization: "asymptotic-analysis",
    code: `
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
# Time complexity: O(n) - upper bound
# Space complexity: O(1)

def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
# Time complexity: O(log n) - upper bound
# Space complexity: O(1)
    `,
    notes: `
    - The visualization shows three asymptotic notations:
      * O (Big O): Upper bound (red)
      * Ω (Omega): Lower bound (green)
      * Θ (Theta): Tight bound (blue)
    - These notations help describe the growth rate of algorithms as the input size approaches infinity.
    - Big O (O) is most commonly used as it represents the worst-case scenario.
    - The code examples show linear search (O(n)) and binary search (O(log n)) algorithms.
    - Asymptotic analysis allows us to compare algorithms independently of specific implementations or hardware.
    `,
  },
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

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers)
print(f"Sorted array: {sorted_numbers}")
    `,
    notes: `
    - The visualization shows the Bubble Sort algorithm in action:
      * Blue bars represent unsorted elements
      * Orange bars represent the elements being compared in the current step
      * Green bars represent sorted elements
    - In each pass, the largest unsorted element "bubbles up" to its correct position.
    - The number of passes equals the number of elements in the array.
    - While simple to understand and implement, Bubble Sort is inefficient for large datasets.
    - The code example demonstrates a straightforward implementation of Bubble Sort in Python.
    `,
  },
  {
    name: "Binary Search",
    description: "A search algorithm that finds the position of a target value within a sorted array",
    longDescription: `
    Binary Search is an efficient algorithm for searching a sorted array by repeatedly dividing the search interval in half. It works by comparing the target value to the middle element of the array. If they are unequal, the half in which the target cannot lie is eliminated, and the search continues on the remaining half until the target is found or it is clear the target is not in the array.

    Key characteristics of Binary Search:
    1. Requires a sorted array
    2. O(log n) time complexity
    3. Significantly faster than linear search for large datasets
    4. Uses the divide-and-conquer approach

    Binary Search is particularly useful:
    - When searching in large, sorted datasets
    - When the dataset is too large to iterate through linearly
    - In situations where the dataset is searched repeatedly, justifying the cost of sorting

    The efficiency of Binary Search makes it a fundamental algorithm in computer science, often used as a building block for more complex algorithms.
    `,
    visualization: "binary-search",
    code: `
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid  # Target found, return its index
        elif arr[mid] < target:
            low = mid + 1  # Target is in the upper half
        else:
            high = mid - 1  # Target is in the lower half

    return -1  # Target not found

# Example usage
sorted_numbers = [1, 3, 5, 7, 9, 11, 13, 15]
target = 7
result = binary_search(sorted_numbers, target)
print(f"Index of {target}: {result}")
    `,
    notes: `
    - The visualization demonstrates Binary Search:
      * Blue elements represent the current search range
      * Orange element represents the middle element being compared
      * Gray elements are outside the current search range
    - L, M, and R pointers show the current low, middle, and high indices.
    - The search range is halved in each step, leading to logarithmic time complexity.
    - Binary Search is much faster than linear search for large sorted datasets.
    - The code example shows a typical implementation of Binary Search in Python.
    - Remember that the input array must be sorted for Binary Search to work correctly.
    `,
  },
]

export default function AlgorithmsPage() {
  const [activeAlgorithm, setActiveAlgorithm] = useState(algorithms[0].name)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Algorithms</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Explore various algorithms, their implementations, and use cases. Understanding these fundamental algorithms is
        crucial for efficient problem-solving and optimizing software performance.
      </p>
      <Tabs defaultValue={algorithms[0].name} onValueChange={setActiveAlgorithm}>
        <TabsList className="mb-4">
          {algorithms.map((algo) => (
            <TabsTrigger key={algo.name} value={algo.name}>
              {algo.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {algorithms.map((algo) => (
          <TabsContent key={algo.name} value={algo.name}>
            <Card>
              <CardHeader>
                <CardTitle>{algo.name}</CardTitle>
                <CardDescription>{algo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visualization</h3>
                    <AlgorithmVisualization type={algo.visualization} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                    <CodeBlock code={algo.code} language="python" />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Detailed Explanation</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{algo.longDescription}</p>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Notes</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{algo.notes}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

