"use client"
import { Play, Pause, SkipForward, RotateCcw, BookOpen, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"

// Define graph types

type Node = {
  id: number
  label: string
  x?: number
  y?: number
}

type Edge = {
  source: number
  target: number
  weight: number
}

type Graph = {
  nodes: Node[]
  edges: Edge[]
}

// Define algorithm step type
type AlgorithmStep = {
  mstNodes: number[]
  mstEdges: Edge[]
  currentHeap: { edge: Edge; priority: number }[]
  currentEdge: Edge | null
  description: string
  detailedExplanation: string
  heapOperation: "insert" | "extract" | "update" | "none"
  highlightNodes: number[]
}

// Predefined graphs
const predefinedGraphs = {
  simple: {
    nodes: [
      { id: 0, label: "A" },
      { id: 1, label: "B" },
      { id: 2, label: "C" },
      { id: 3, label: "D" },
      { id: 4, label: "E" },
      { id: 5, label: "F" },
      { id: 6, label: "G" },
    ],
    edges: [
      { source: 0, target: 1, weight: 7 },
      { source: 0, target: 3, weight: 5 },
      { source: 1, target: 2, weight: 8 },
      { source: 1, target: 3, weight: 9 },
      { source: 1, target: 4, weight: 7 },
      { source: 2, target: 4, weight: 5 },
      { source: 3, target: 4, weight: 15 },
      { source: 3, target: 5, weight: 6 },
      { source: 4, target: 5, weight: 8 },
      { source: 4, target: 6, weight: 9 },
      { source: 5, target: 6, weight: 11 },
    ],
  },
  complex: {
    nodes: [
      { id: 0, label: "A" },
      { id: 1, label: "B" },
      { id: 2, label: "C" },
      { id: 3, label: "D" },
      { id: 4, label: "E" },
      { id: 5, label: "F" },
      { id: 6, label: "G" },
      { id: 7, label: "H" },
      { id: 8, label: "I" },
    ],
    edges: [
      { source: 0, target: 1, weight: 4 },
      { source: 0, target: 7, weight: 8 },
      { source: 1, target: 2, weight: 8 },
      { source: 1, target: 7, weight: 11 },
      { source: 2, target: 3, weight: 7 },
      { source: 2, target: 5, weight: 4 },
      { source: 2, target: 8, weight: 2 },
      { source: 3, target: 4, weight: 9 },
      { source: 3, target: 5, weight: 14 },
      { source: 4, target: 5, weight: 10 },
      { source: 5, target: 6, weight: 2 },
      { source: 6, target: 7, weight: 1 },
      { source: 6, target: 8, weight: 6 },
      { source: 7, target: 8, weight: 7 },
    ],
  },
  dense: {
    nodes: [
      { id: 0, label: "A" },
      { id: 1, label: "B" },
      { id: 2, label: "C" },
      { id: 3, label: "D" },
      { id: 4, label: "E" },
    ],
    edges: [
      { source: 0, target: 1, weight: 2 },
      { source: 0, target: 2, weight: 3 },
      { source: 0, target: 3, weight: 1 },
      { source: 0, target: 4, weight: 4 },
      { source: 1, target: 2, weight: 5 },
      { source: 1, target: 3, weight: 2 },
      { source: 1, target: 4, weight: 3 },
      { source: 2, target: 3, weight: 6 },
      { source: 2, target: 4, weight: 1 },
      { source: 3, target: 4, weight: 7 },
    ],
  },
}

// Run Prim's algorithm to generate steps
const generatePrimSteps = (graph: Graph): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = []
  const { nodes, edges } = graph

  if (nodes.length === 0) return steps

  // Start with node 0
  const startNode = 0
  const mstNodes = [startNode]
  const mstEdges: Edge[] = []
  let minHeap: { edge: Edge; priority: number }[] = []

  // Add initial step
  steps.push({
    mstNodes: [...mstNodes],
    mstEdges: [...mstEdges],
    currentHeap: [],
    currentEdge: null,
    description: `Starting Prim's algorithm from node ${nodes[startNode].label}`,
    detailedExplanation: `We begin by selecting node ${nodes[startNode].label} as our starting point. This node will be the first node in our Minimum Spanning Tree (MST). The MST is currently empty with no edges.`,
    heapOperation: "none",
    highlightNodes: [startNode],
  })

  // Add all edges from start node to heap
  const initialHeapEntries: { edge: Edge; priority: number }[] = []
  edges.forEach((edge) => {
    if (edge.source === startNode) {
      initialHeapEntries.push({ edge, priority: edge.weight })
    } else if (edge.target === startNode) {
      // Add edge in reverse direction for visualization
      initialHeapEntries.push({
        edge: { source: edge.target, target: edge.source, weight: edge.weight },
        priority: edge.weight,
      })
    }
  })

  // Sort heap by weight
  initialHeapEntries.sort((a, b) => a.priority - b.priority)
  minHeap = [...initialHeapEntries]

  steps.push({
    mstNodes: [...mstNodes],
    mstEdges: [...mstEdges],
    currentHeap: [...minHeap],
    currentEdge: null,
    description: `Added all edges from node ${nodes[startNode].label} to the min-heap`,
    detailedExplanation: `We identify all edges connected to our starting node ${nodes[startNode].label} and add them to the min-heap. The min-heap is a data structure that always gives us the edge with the minimum weight when we extract from it. This is crucial for Prim's algorithm as we always want to select the edge with the minimum weight that connects a node in our MST to a node outside our MST.`,
    heapOperation: "insert",
    highlightNodes: [startNode],
  })

  // Run Prim's algorithm
  while (minHeap.length > 0 && mstNodes.length < nodes.length) {
    // Extract min edge from heap
    const { edge } = minHeap.shift()!

    // Check if target node is already in MST
    if (mstNodes.includes(edge.target)) {
      steps.push({
        mstNodes: [...mstNodes],
        mstEdges: [...mstEdges],
        currentHeap: [...minHeap],
        currentEdge: edge,
        description: `Edge ${nodes[edge.source].label}-${nodes[edge.target].label} (weight: ${edge.weight}) connects to node ${nodes[edge.target].label} which is already in MST. Skipping.`,
        detailedExplanation: `We extract the minimum weight edge from the heap, which is ${nodes[edge.source].label}-${nodes[edge.target].label} with weight ${edge.weight}. However, we notice that node ${nodes[edge.target].label} is already in our MST. Adding this edge would create a cycle, which is not allowed in a spanning tree. Therefore, we discard this edge and continue.`,
        heapOperation: "extract",
        highlightNodes: [edge.source, edge.target],
      })
      continue
    }

    // Add edge to MST
    mstEdges.push(edge)
    mstNodes.push(edge.target)

    steps.push({
      mstNodes: [...mstNodes],
      mstEdges: [...mstEdges],
      currentHeap: [...minHeap],
      currentEdge: edge,
      description: `Added edge ${nodes[edge.source].label}-${nodes[edge.target].label} (weight: ${edge.weight}) to MST`,
      detailedExplanation: `We extract the minimum weight edge from the heap, which is ${nodes[edge.source].label}-${nodes[edge.target].label} with weight ${edge.weight}. Since node ${nodes[edge.target].label} is not yet in our MST, we add this edge to our MST and add node ${nodes[edge.target].label} to our set of MST nodes. The MST now has ${mstEdges.length} edge(s) and ${mstNodes.length} node(s).`,
      heapOperation: "extract",
      highlightNodes: [edge.source, edge.target],
    })

    // Add all edges from new node to heap
    const newEdges: { edge: Edge; priority: number }[] = []
    edges.forEach((e) => {
      if (e.source === edge.target && !mstNodes.includes(e.target)) {
        newEdges.push({ edge: e, priority: e.weight })
      } else if (e.target === edge.target && !mstNodes.includes(e.source)) {
        // Add edge in reverse direction for visualization
        newEdges.push({
          edge: { source: e.target, target: e.source, weight: e.weight },
          priority: e.weight,
        })
      }
    })

    if (newEdges.length > 0) {
      // Add new edges to heap
      minHeap = [...minHeap, ...newEdges]
      // Sort heap by weight
      minHeap.sort((a, b) => a.priority - b.priority)

      steps.push({
        mstNodes: [...mstNodes],
        mstEdges: [...mstEdges],
        currentHeap: [...minHeap],
        currentEdge: null,
        description: `Added edges from node ${nodes[edge.target].label} to the min-heap and reordered`,
        detailedExplanation: `Now that we've added node ${nodes[edge.target].label} to our MST, we identify all edges connected to this node that lead to nodes not yet in our MST. We add these edges to our min-heap and reorder the heap to maintain the min-heap property. This ensures that the next edge we extract will be the minimum weight edge connecting our current MST to a node outside the MST.`,
        heapOperation: "update",
        highlightNodes: [edge.target],
      })
    }
  }

  // Final step
  steps.push({
    mstNodes: [...mstNodes],
    mstEdges: [...mstEdges],
    currentHeap: [],
    currentEdge: null,
    description: "Prim's algorithm completed. MST found!",
    detailedExplanation: `Prim's algorithm has completed! We have found a Minimum Spanning Tree with ${mstEdges.length} edges connecting all ${mstNodes.length} nodes. The total weight of the MST is ${mstEdges.reduce((sum, edge) => sum + edge.weight, 0)}. This MST represents the minimum total weight needed to connect all nodes in the graph.`,
    heapOperation: "none",
    highlightNodes: [],
  })

  return steps
}

export default function PrimsVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heapCanvasRef = useRef<HTMLCanvasElement>(null)
  const [graph, setGraph] = useState<Graph>(predefinedGraphs.simple)
  const [steps, setSteps] = useState<AlgorithmStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [showHeap, setShowHeap] = useState(true)
  const [showDetailedExplanations, setShowDetailedExplanations] = useState(true)
  const [highlightCurrentStep, setHighlightCurrentStep] = useState(true)
  const [selectedGraph, setSelectedGraph] = useState("simple")
  const [animationMode, setAnimationMode] = useState("normal")
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  // Generate algorithm steps
  useEffect(() => {
    const algorithmSteps = generatePrimSteps(graph)
    setSteps(algorithmSteps)
    setCurrentStep(0)
  }, [graph])

  // Position nodes in a circle
  useEffect(() => {
    const radius = 150
    const centerX = 250
    const centerY = 200

    graph.nodes.forEach((node, index) => {
      const angle = (index / graph.nodes.length) * 2 * Math.PI
      node.x = centerX + radius * Math.cos(angle)
      node.y = centerY + radius * Math.sin(angle)
    })
  }, [graph])

  // Animation loop
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const animate = (time: number) => {
      const delay = animationMode === "slow" ? 3000 / speed : 2000 / speed

      if (time - lastTimeRef.current > delay) {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
        lastTimeRef.current = time
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, currentStep, steps, speed, animationMode])

  // Draw graph
  useEffect(() => {
    if (!canvasRef.current || steps.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const step = steps[currentStep]

    // Draw edges
    graph.edges.forEach((edge) => {
      const sourceNode = graph.nodes[edge.source]
      const targetNode = graph.nodes[edge.target]

      if (!sourceNode.x || !sourceNode.y || !targetNode.x || !targetNode.y) return

      // Check if edge is in MST
      const isInMST = step.mstEdges.some(
        (e) =>
          (e.source === edge.source && e.target === edge.target) ||
          (e.source === edge.target && e.target === edge.source),
      )

      // Check if edge is current edge
      const isCurrent =
        step.currentEdge &&
        ((step.currentEdge.source === edge.source && step.currentEdge.target === edge.target) ||
          (step.currentEdge.source === edge.target && step.currentEdge.target === edge.source))

      // Set edge style
      ctx.beginPath()
      ctx.moveTo(sourceNode.x, sourceNode.y)
      ctx.lineTo(targetNode.x, targetNode.y)

      if (isCurrent) {
        ctx.strokeStyle = "#ff9800"
        ctx.lineWidth = 3
      } else if (isInMST) {
        ctx.strokeStyle = "#4caf50"
        ctx.lineWidth = 3
      } else {
        ctx.strokeStyle = "#ccc"
        ctx.lineWidth = 1
      }

      ctx.stroke()

      // Draw weight
      const midX = (sourceNode.x + targetNode.x) / 2
      const midY = (sourceNode.y + targetNode.y) / 2

      // Add a background for the weight text
      ctx.fillStyle = "white"
      ctx.beginPath()
      ctx.arc(midX, midY, 10, 0, 2 * Math.PI)
      ctx.fill()

      ctx.fillStyle = isInMST ? "#4caf50" : isCurrent ? "#ff9800" : "#666"
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(edge.weight.toString(), midX, midY)
    })

    // Draw nodes
    graph.nodes.forEach((node, index) => {
      if (!node.x || !node.y) return

      const isInMST = step.mstNodes.includes(index)
      const isHighlighted = step.highlightNodes.includes(index) && highlightCurrentStep

      // Draw node highlight if needed
      if (isHighlighted) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 24, 0, 2 * Math.PI)
        ctx.fillStyle = "rgba(255, 152, 0, 0.3)"
        ctx.fill()
      }

      ctx.beginPath()
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI)

      if (isInMST) {
        ctx.fillStyle = "#4caf50"
      } else {
        ctx.fillStyle = "#f5f5f5"
      }

      ctx.strokeStyle = isHighlighted ? "#ff9800" : "#333"
      ctx.lineWidth = isHighlighted ? 3 : 2
      ctx.fill()
      ctx.stroke()

      // Draw node label
      ctx.fillStyle = isInMST ? "#fff" : "#333"
      ctx.font = "bold 16px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.label, node.x, node.y)
    })
  }, [graph, steps, currentStep, highlightCurrentStep])

  // Draw heap visualization
  useEffect(() => {
    if (!heapCanvasRef.current || steps.length === 0 || !showHeap) return

    const canvas = heapCanvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const step = steps[currentStep]
    const heap = step.currentHeap

    if (heap.length === 0) {
      ctx.fillStyle = "#666"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("Heap is empty", canvas.width / 2, canvas.height / 2)
      return
    }

    // Draw heap as a binary tree
    const nodeRadius = 25
    const levelHeight = 70
    const drawHeapNode = (index: number, x: number, y: number) => {
      if (index >= heap.length) return

      const edge = heap[index].edge
      const weight = edge.weight
      const sourceLabel = graph.nodes[edge.source].label
      const targetLabel = graph.nodes[edge.target].label

      // Draw connections to children
      const leftChildIndex = 2 * index + 1
      const rightChildIndex = 2 * index + 2

      if (leftChildIndex < heap.length) {
        const childX = x - Math.pow(2, Math.floor(Math.log2(heap.length - index))) * 20
        const childY = y + levelHeight

        ctx.beginPath()
        ctx.moveTo(x, y + nodeRadius)
        ctx.lineTo(childX, childY - nodeRadius)
        ctx.strokeStyle = "#ccc"
        ctx.lineWidth = 1
        ctx.stroke()

        drawHeapNode(leftChildIndex, childX, childY)
      }

      if (rightChildIndex < heap.length) {
        const childX = x + Math.pow(2, Math.floor(Math.log2(heap.length - index))) * 20
        const childY = y + levelHeight

        ctx.beginPath()
        ctx.moveTo(x, y + nodeRadius)
        ctx.lineTo(childX, childY - nodeRadius)
        ctx.strokeStyle = "#ccc"
        ctx.lineWidth = 1
        ctx.stroke()

        drawHeapNode(rightChildIndex, childX, childY)
      }

      // Draw node
      ctx.beginPath()
      ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI)

      // Highlight node based on heap operation
      if (index === 0 && step.heapOperation === "extract") {
        ctx.fillStyle = "#ff9800"
      } else if (step.heapOperation === "insert" && index === heap.length - 1) {
        ctx.fillStyle = "#2196f3"
      } else if (step.heapOperation === "update") {
        ctx.fillStyle = "#9c27b0"
      } else {
        ctx.fillStyle = "#f5f5f5"
      }

      ctx.strokeStyle = "#333"
      ctx.lineWidth = 2
      ctx.fill()
      ctx.stroke()

      // Draw edge info
      ctx.fillStyle = "#333"
      ctx.font = "bold 12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${sourceLabel}-${targetLabel}`, x, y - 5)

      ctx.font = "12px Arial"
      ctx.fillText(`${weight}`, x, y + 10)
    }

    // Start drawing from the root
    drawHeapNode(0, canvas.width / 2, 40)
  }, [graph, steps, currentStep, showHeap])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const resetAnimation = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const stepForward = () => {
    setIsPlaying(false)
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const stepBackward = () => {
    setIsPlaying(false)
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0])
  }

  const handleGraphChange = (value: string) => {
    setSelectedGraph(value)
    setGraph(predefinedGraphs[value as keyof typeof predefinedGraphs])
  }

  const calculateTotalMSTWeight = () => {
    if (steps.length === 0) return 0
    return steps[currentStep].mstEdges.reduce((sum, edge) => sum + edge.weight, 0)
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Graph Visualization</h3>
              <div className="flex items-center space-x-2">
                <Select value={selectedGraph} onValueChange={handleGraphChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Graph" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple Graph</SelectItem>
                    <SelectItem value="complex">Complex Graph</SelectItem>
                    <SelectItem value="dense">Dense Graph</SelectItem>
                  </SelectContent>
                </Select>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Visualization Settings</DialogTitle>
                      <DialogDescription>Customize how the algorithm is visualized</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-heap">Show Min-Heap</Label>
                        <Switch id="show-heap" checked={showHeap} onCheckedChange={setShowHeap} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-explanations">Detailed Explanations</Label>
                        <Switch
                          id="show-explanations"
                          checked={showDetailedExplanations}
                          onCheckedChange={setShowDetailedExplanations}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="highlight-steps">Highlight Current Step</Label>
                        <Switch
                          id="highlight-steps"
                          checked={highlightCurrentStep}
                          onCheckedChange={setHighlightCurrentStep}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="animation-mode">Animation Mode</Label>
                        <Select value={animationMode} onValueChange={setAnimationMode}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Animation Mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="slow">Slow Motion</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="relative w-full h-[400px] border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
              <canvas ref={canvasRef} width={500} height={400} className="w-full h-full" />
            </div>
          </div>

          {showHeap && (
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-4">
              <h3 className="text-lg font-semibold mb-2">Min-Heap Visualization</h3>
              <div className="relative w-full h-[200px] border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
                <canvas ref={heapCanvasRef} width={500} height={200} className="w-full h-full" />
              </div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                <p>The min-heap always gives us the edge with the minimum weight when we extract from it.</p>
                <div className="flex items-center mt-1 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#ff9800] mr-1"></div>
                    <span>Extracting</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#2196f3] mr-1"></div>
                    <span>Inserting</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#9c27b0] mr-1"></div>
                    <span>Updating</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-semibold mb-2">Algorithm Progress</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium">MST Weight: {calculateTotalMSTWeight()}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-600 h-2 rounded-full overflow-hidden mb-4">
              <div
                className="bg-primary h-full transition-all duration-300 ease-in-out"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg mb-4">
              <p className="text-sm text-slate-800 dark:text-slate-200 font-medium mb-1">
                {steps[currentStep]?.description || ""}
              </p>
              {showDetailedExplanations && (
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  {steps[currentStep]?.detailedExplanation || ""}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={stepBackward} disabled={currentStep <= 0}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="19 20 9 12 19 4 19 20"></polygon>
                    <line x1="5" y1="19" x2="5" y2="5"></line>
                  </svg>
                </Button>
                <Button variant="outline" size="icon" onClick={togglePlay} disabled={currentStep >= steps.length - 1}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={stepForward} disabled={currentStep >= steps.length - 1}>
                  <SkipForward className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={resetAnimation}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Speed:</span>
                <div className="w-32">
                  <Slider value={[speed]} min={0.5} max={3} step={0.5} onValueChange={handleSpeedChange} />
                </div>
              </div>
            </div>

            <Tabs defaultValue="heap">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="heap">Min-Heap</TabsTrigger>
                <TabsTrigger value="mst">Current MST</TabsTrigger>
                <TabsTrigger value="help">Help</TabsTrigger>
              </TabsList>
              <TabsContent value="heap" className="p-4 border rounded-md mt-2 max-h-[300px] overflow-auto">
                <h4 className="font-medium mb-2">Current Min-Heap</h4>
                {steps[currentStep]?.currentHeap.length > 0 ? (
                  <div className="space-y-2">
                    {steps[currentStep]?.currentHeap.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700"
                      >
                        <span className="font-medium">
                          {graph.nodes[item.edge.source].label}-{graph.nodes[item.edge.target].label}
                        </span>
                        <span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded font-mono text-sm">
                          Weight: {item.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400">Heap is empty</p>
                )}
              </TabsContent>
              <TabsContent value="mst" className="p-4 border rounded-md mt-2 max-h-[300px] overflow-auto">
                <h4 className="font-medium mb-2">Current MST Edges</h4>
                {steps[currentStep]?.mstEdges.length > 0 ? (
                  <div className="space-y-2">
                    {steps[currentStep]?.mstEdges.map((edge, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700"
                      >
                        <span className="font-medium">
                          {graph.nodes[edge.source].label}-{graph.nodes[edge.target].label}
                        </span>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded font-mono text-sm">
                          Weight: {edge.weight}
                        </span>
                      </div>
                    ))}
                    <div className="mt-4 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                      <span className="font-medium">Total MST Weight: {calculateTotalMSTWeight()}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400">MST is empty</p>
                )}
              </TabsContent>
              <TabsContent value="help" className="p-4 border rounded-md mt-2 max-h-[300px] overflow-auto">
                <h4 className="font-medium mb-2">Understanding Prim's Algorithm</h4>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Goal:</strong> Find a Minimum Spanning Tree (MST) - a subset of edges that connects all
                    vertices with minimum total weight.
                  </p>

                  <p>
                    <strong>Key Steps:</strong>
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Start with any vertex as the initial MST</li>
                    <li>Use a min-heap to track edges connecting MST to non-MST vertices</li>
                    <li>Always select the minimum weight edge that doesn't create a cycle</li>
                    <li>Add new edges from each newly added vertex to the min-heap</li>
                    <li>Continue until all vertices are in the MST</li>
                  </ol>

                  <p>
                    <strong>Color Legend:</strong>
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <span className="inline-block w-3 h-3 bg-[#4caf50] rounded-full mr-2"></span> Nodes and edges in
                      the MST
                    </li>
                    <li>
                      <span className="inline-block w-3 h-3 bg-[#ff9800] rounded-full mr-2"></span> Current edge being
                      considered
                    </li>
                    <li>
                      <span className="inline-block w-3 h-3 bg-[#f5f5f5] border border-slate-300 rounded-full mr-2"></span>{" "}
                      Nodes not yet in MST
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full mb-4">
                <BookOpen className="h-4 w-4 mr-2" />
                Learn More About Prim's Algorithm
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Prim's Algorithm and Min-Heaps</DialogTitle>
                <DialogDescription>
                  A comprehensive guide to understanding how Prim's algorithm works with min-heaps
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <h3 className="text-lg font-semibold">What is Prim's Algorithm?</h3>
                <p>
                  Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected
                  graph. This means it finds a subset of the edges that forms a tree that includes every vertex, where
                  the total weight of all the edges in the tree is minimized.
                </p>

                <h3 className="text-lg font-semibold">How Does It Work?</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Initialization:</strong> Start with any vertex. This vertex becomes the initial MST.
                  </li>
                  <li>
                    <strong>Edge Selection:</strong> Consider all edges that connect the current MST to vertices not yet
                    in the MST. Choose the edge with the minimum weight.
                  </li>
                  <li>
                    <strong>Expansion:</strong> Add the selected edge and the new vertex to the MST.
                  </li>
                  <li>
                    <strong>Repeat:</strong> Continue steps 2-3 until all vertices are included in the MST.
                  </li>
                </ol>

                <h3 className="text-lg font-semibold">The Role of Min-Heap</h3>
                <p>
                  A min-heap is a binary tree data structure where the parent node is always smaller than or equal to
                  its children. In Prim's algorithm, we use a min-heap to efficiently find the edge with the minimum
                  weight at each step.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Min-Heap Operations</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Insert:</strong> Add a new edge to the heap (O(log n))
                      </li>
                      <li>
                        <strong>Extract-Min:</strong> Remove and return the edge with minimum weight (O(log n))
                      </li>
                      <li>
                        <strong>Decrease-Key:</strong> Reduce the weight of an edge (O(log n))
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Time Complexity</h4>
                    <p>Using a min-heap implementation:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Time Complexity: O(E log V)</li>
                      <li>Space Complexity: O(V + E)</li>
                      <li>Where E is the number of edges and V is the number of vertices</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mt-4">Comparison with Other MST Algorithms</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-700">
                        <th className="border p-2 text-left">Algorithm</th>
                        <th className="border p-2 text-left">Approach</th>
                        <th className="border p-2 text-left">Time Complexity</th>
                        <th className="border p-2 text-left">Key Advantage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">Prim's</td>
                        <td className="border p-2">Grow a single tree</td>
                        <td className="border p-2">O(E log V)</td>
                        <td className="border p-2">Efficient for dense graphs</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Kruskal's</td>
                        <td className="border p-2">Merge forests</td>
                        <td className="border p-2">O(E log E)</td>
                        <td className="border p-2">Efficient for sparse graphs</td>
                      </tr>
                      <tr>
                        <td className="border p-2">Borůvka's</td>
                        <td className="border p-2">Grow multiple trees</td>
                        <td className="border p-2">O(E log V)</td>
                        <td className="border p-2">Parallelizable</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-semibold mt-4">Applications</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Network design (telecommunications, electrical grids, etc.)</li>
                  <li>Approximation algorithms for NP-hard problems</li>
                  <li>Cluster analysis in data mining</li>
                  <li>Image segmentation in computer vision</li>
                  <li>Circuit design in VLSI</li>
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

