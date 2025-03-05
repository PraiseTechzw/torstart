"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowRight, Code, FileText, Play, Settings } from "lucide-react"
import DataStructureVisualization from "@/components/data-structure-visualization"
import CodeBlock from "@/components/code-block"
import ComplexityTable from "@/components/complexity-table"
import Link from "next/link"

const dataStructures = [
  {
    name: "Array",
    description: "A collection of elements stored at contiguous memory locations",
    longDescription: `
      An array is a fundamental data structure that stores elements of the same type in contiguous memory locations. It provides fast access to individual elements using their indices. Arrays are widely used due to their simplicity and efficiency in accessing elements.

      Key characteristics of arrays:
      1. Fixed size (in most programming languages)
      2. Homogeneous elements (all elements are of the same type)
      3. Random access (constant time access to any element)
      4. Cache-friendly (due to contiguous memory allocation)

      Arrays are particularly useful when:
      - You need to store a collection of elements of the same type
      - You know the size of the collection in advance
      - You require fast access to elements by their position
    `,
    visualization: "array",
    code: `
class DynamicArray:
    def __init__(self):
        self.array = []
        self.size = 0

    def append(self, element):
        self.array.append(element)
        self.size += 1

    def insert(self, index, element):
        self.array.insert(index, element)
        self.size += 1

    def remove(self, element):
        self.array.remove(element)
        self.size -= 1

    def get(self, index):
        return self.array[index]

    def length(self):
        return self.size
    `,
    timeComplexity: [
      { operation: "Access", complexity: "O(1)" },
      { operation: "Search", complexity: "O(n)" },
      { operation: "Insertion", complexity: "O(n)" },
      { operation: "Deletion", complexity: "O(n)" },
    ],
    spaceComplexity: "O(n)",
    realWorldApplications: [
      "Storing and accessing sequential data",
      "Implementing matrices for scientific computing",
      "Managing fixed-size buffers in embedded systems",
      "Implementing other data structures like stacks and queues",
    ],
  },
  {
    name: "Linked List",
    description: "A linear collection of data elements whose order is not given by their physical placement in memory",
    longDescription: `
      A linked list is a linear data structure where elements are stored in nodes. Each node contains a data field and a reference (or link) to the next node in the sequence. Unlike arrays, linked lists do not store elements in contiguous memory locations.

      Key characteristics of linked lists:
      1. Dynamic size (can grow or shrink at runtime)
      2. Efficient insertion and deletion (especially at the beginning)
      3. Non-contiguous memory allocation
      4. Sequential access (no random access)

      Types of linked lists:
      1. Singly Linked List: Each node has a reference to the next node
      2. Doubly Linked List: Each node has references to both the next and previous nodes
      3. Circular Linked List: The last node points back to the first node

      Linked lists are particularly useful when:
      - You need frequent insertions or deletions
      - You don't know the size of the list in advance
      - You don't need random access to elements
    `,
    visualization: "linked-list",
    code: `
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def delete(self, data):
        if not self.head:
            return
        if self.head.data == data:
            self.head = self.head.next
            return
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next

    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(current.data)
            current = current.next
        return elements
    `,
    timeComplexity: [
      { operation: "Access", complexity: "O(n)" },
      { operation: "Search", complexity: "O(n)" },
      { operation: "Insertion (at beginning)", complexity: "O(1)" },
      { operation: "Insertion (at end)", complexity: "O(n)" },
      { operation: "Deletion", complexity: "O(n)" },
    ],
    spaceComplexity: "O(n)",
    realWorldApplications: [
      "Implementing undo functionality in applications",
      "Managing memory allocation in operating systems",
      "Representing polynomials in computer algebra systems",
      "Implementing hash tables with chaining for collision resolution",
    ],
  },
  {
    name: "Stack",
    description: "A linear data structure that follows the Last-In-First-Out (LIFO) principle",
    longDescription: `
      A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. This means that the last element added to the stack will be the first one to be removed. Think of it like a stack of plates - you add plates to the top and remove them from the top.

      Key characteristics of stacks:
      1. LIFO (Last-In-First-Out) order
      2. Elements are added and removed from the same end (top)
      3. Supports two main operations: push (add) and pop (remove)
      4. Can be implemented using arrays or linked lists

      Stacks are particularly useful when:
      - You need to reverse the order of elements
      - You want to keep track of function calls (call stack)
      - You need to implement undo/redo functionality
      - Parsing expressions (e.g., checking for balanced parentheses)
    `,
    visualization: "stack",
    code: `
class Stack:
  def __init__(self):
      self.items = []

  def push(self, item):
      self.items.append(item)

  def pop(self):
      if not self.is_empty():
          return self.items.pop()
      return None

  def peek(self):
      if not self.is_empty():
          return self.items[-1]
      return None

  def is_empty(self):
      return len(self.items) == 0

  def size(self):
      return len(self.items)
  `,
    timeComplexity: [
      { operation: "Push", complexity: "O(1)" },
      { operation: "Pop", complexity: "O(1)" },
      { operation: "Peek", complexity: "O(1)" },
      { operation: "Is Empty", complexity: "O(1)" },
      { operation: "Size", complexity: "O(1)" },
    ],
    spaceComplexity: "O(n)",
    realWorldApplications: [
      "Function call stack in programming languages",
      "Undo mechanism in text editors",
      "Browser history (back button functionality)",
      "Expression evaluation in calculators",
    ],
  },
  {
    name: "Queue",
    description: "A linear data structure that follows the First-In-First-Out (FIFO) principle",
    longDescription: `
      A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. This means that the first element added to the queue will be the first one to be removed. Think of it like a line of people waiting for a service - the first person to join the line is the first to be served.

      Key characteristics of queues:
      1. FIFO (First-In-First-Out) order
      2. Elements are added at one end (rear) and removed from the other end (front)
      3. Supports two main operations: enqueue (add) and dequeue (remove)
      4. Can be implemented using arrays or linked lists

      Queues are particularly useful when:
      - You need to maintain the order of operations
      - You want to process requests in the order they were received
      - You need to implement breadth-first search in graphs
      - Managing tasks in multitasking systems
    `,
    visualization: "queue",
    code: `
class Queue:
  def __init__(self):
      self.items = []

  def enqueue(self, item):
      self.items.append(item)

  def dequeue(self):
      if not self.is_empty():
          return self.items.pop(0)
      return None

  def front(self):
      if not self.is_empty():
          return self.items[0]
      return None

  def is_empty(self):
      return len(self.items) == 0

  def size(self):
      return len(self.items)
  `,
    timeComplexity: [
      { operation: "Enqueue", complexity: "O(1)" },
      { operation: "Dequeue", complexity: "O(n)" },
      { operation: "Front", complexity: "O(1)" },
      { operation: "Is Empty", complexity: "O(1)" },
      { operation: "Size", complexity: "O(1)" },
    ],
    spaceComplexity: "O(n)",
    realWorldApplications: [
      "Print job spooling",
      "Handling requests in web servers",
      "Breadth-first search in graph algorithms",
      "Task scheduling in operating systems",
    ],
  },
  // Add more data structures here (Stack, Queue, Hash Table, etc.)
]

export default function DataStructuresPage() {
  const [activeDataStructure, setActiveDataStructure] = useState(dataStructures[0].name)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [showComplexity, setShowComplexity] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <motion.div
      className={`space-y-6 ${darkMode ? "dark" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Data Structures Fundamentals</h1>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Explore various data structures, their implementations, and use cases. Understanding these fundamental building
        blocks is crucial for efficient algorithm design and problem-solving in computer science.
      </p>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Visualization Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="animation-speed">Animation Speed</Label>
              <Slider
                id="animation-speed"
                min={0.5}
                max={2}
                step={0.1}
                value={[animationSpeed]}
                onValueChange={(value) => setAnimationSpeed(value[0])}
              />
              <span>{animationSpeed.toFixed(1)}x</span>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="show-complexity" checked={showComplexity} onCheckedChange={setShowComplexity} />
              <Label htmlFor="show-complexity">Show Complexity Analysis</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue={dataStructures[0].name} onValueChange={setActiveDataStructure}>
        <TabsList className="mb-4">
          {dataStructures.map((ds) => (
            <TabsTrigger key={ds.name} value={ds.name}>
              {ds.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {dataStructures.map((ds) => (
          <TabsContent key={ds.name} value={ds.name}>
            <Card>
              <CardHeader>
                <CardTitle>{ds.name}</CardTitle>
                <CardDescription>{ds.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visualization</h3>
                    <DataStructureVisualization
                      type={ds.visualization}
                      animationSpeed={animationSpeed}
                      darkMode={darkMode}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                    <CodeBlock code={ds.code} language="python" />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Detailed Explanation</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{ds.longDescription}</p>
                </div>
                {showComplexity && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Time and Space Complexity</h3>
                    <ComplexityTable timeComplexity={ds.timeComplexity} spaceComplexity={ds.spaceComplexity} />
                  </div>
                )}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Real-World Applications</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {ds.realWorldApplications.map((app, index) => (
                      <li key={index}>{app}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex justify-between">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" /> Further Reading
                  </Button>
                  <Button variant="outline">
                    <Code className="mr-2 h-4 w-4" /> Practice Exercises
                  </Button>
                  <Button>
                    <Play className="mr-2 h-4 w-4" /> Interactive Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-8 text-center">
        <Link href="/algorithms">
          <Button size="lg">
            Explore Algorithms <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

