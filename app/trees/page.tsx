"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TreeVisualization from "@/components/tree-visualization"
import CodeBlock from "@/components/code-block"
import Quiz from "@/components/quiz"

const treeContent = [
  {
    name: "Basic Terminology",
    content: `
      Trees are hierarchical data structures with a set of connected nodes. Key terms include:
      
      - Root: The topmost node of the tree
      - Parent: A node with child nodes
      - Child: A node connected to another node when moving away from the root
      - Leaf: A node with no children
      - Subtree: A portion of a tree that is itself a tree
      - Depth: The number of edges from the root to a node
      - Height: The number of edges on the longest path from a node to a leaf
    `,
  },
  {
    name: "Binary Trees",
    content: `
      A binary tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child.
      
      Types of Binary Trees:
      1. Full Binary Tree: Every node has 0 or 2 children
      2. Complete Binary Tree: All levels are filled except possibly the last, which is filled from left to right
      3. Perfect Binary Tree: All internal nodes have two children and all leaf nodes are at the same level
      4. Balanced Binary Tree: The height of the left and right subtrees of every node differs by at most one
    `,
    code: `
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None

    def insert(self, value):
        if not self.root:
            self.root = Node(value)
        else:
            self._insert_recursive(self.root, value)

    def _insert_recursive(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = Node(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = Node(value)
            else:
                self._insert_recursive(node.right, value)
    `,
  },
  {
    name: "Tree Operations",
    content: `
      Common tree operations include:
      
      1. Insertion: Adding a new node to the tree
      2. Deletion: Removing a node from the tree
      3. Search: Finding a specific node in the tree
      4. Traversal: Visiting all nodes in the tree (see Tree Traversal section)
      
      The efficiency of these operations depends on the type of tree and its balance.
    `,
  },
  {
    name: "Tree Traversal",
    content: `
      Tree traversal is the process of visiting each node in a tree exactly once. There are three main types of traversals:
      
      1. In-order traversal: Left subtree, Root, Right subtree
      2. Pre-order traversal: Root, Left subtree, Right subtree
      3. Post-order traversal: Left subtree, Right subtree, Root
    `,
    code: `
def inorder_traversal(node):
    if node:
        inorder_traversal(node.left)
        print(node.value, end=' ')
        inorder_traversal(node.right)

def preorder_traversal(node):
    if node:
        print(node.value, end=' ')
        preorder_traversal(node.left)
        preorder_traversal(node.right)

def postorder_traversal(node):
    if node:
        postorder_traversal(node.left)
        postorder_traversal(node.right)
        print(node.value, end=' ')
    `,
  },
]

const treeQuiz = [
  {
    question: "What is the maximum number of children a node can have in a binary tree?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
  },
  {
    question: "Which traversal visits the root node first?",
    options: ["In-order", "Pre-order", "Post-order", "Level-order"],
    correctAnswer: "Pre-order",
  },
  {
    question: "In a full binary tree, every node has either ____ children.",
    options: ["0 or 1", "1 or 2", "0 or 2", "exactly 2"],
    correctAnswer: "0 or 2",
  },
]

export default function TreesPage() {
  const [activeTab, setActiveTab] = useState(treeContent[0].name)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trees</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Explore tree data structures, their implementations, and common operations.
      </p>
      <Tabs defaultValue={treeContent[0].name} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          {treeContent.map((section) => (
            <TabsTrigger key={section.name} value={section.name}>
              {section.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {treeContent.map((section) => (
          <TabsContent key={section.name} value={section.name}>
            <Card>
              <CardHeader>
                <CardTitle>{section.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line">{section.content}</p>
                  {section.code && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                      <CodeBlock code={section.code} language="python" />
                    </div>
                  )}
                </div>
                {section.name === "Binary Trees" && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Visualization</h3>
                    <TreeVisualization type="binary-tree" />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>Tree Quiz</CardTitle>
          <CardDescription>Test your knowledge of tree data structures</CardDescription>
        </CardHeader>
        <CardContent>
          <Quiz questions={treeQuiz} />
        </CardContent>
      </Card>
    </div>
  )
}

