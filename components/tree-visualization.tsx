"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface TreeNode {
  value: number
  left: TreeNode | null
  right: TreeNode | null
}

const TreeVisualization: React.FC<{ type: string }> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tree, setTree] = useState<TreeNode | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx && tree) {
        drawTree(ctx, tree, 200, 50, 100)
      }
    }
  }, [tree])

  const drawTree = (ctx: CanvasRenderingContext2D, node: TreeNode, x: number, y: number, horizontalSpacing: number) => {
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, 2 * Math.PI)
    ctx.fillStyle = "#4CAF50"
    ctx.fill()
    ctx.fillStyle = "white"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(node.value.toString(), x, y)

    if (node.left) {
      ctx.moveTo(x, y + 20)
      ctx.lineTo(x - horizontalSpacing, y + 60)
      ctx.stroke()
      drawTree(ctx, node.left, x - horizontalSpacing, y + 80, horizontalSpacing / 2)
    }

    if (node.right) {
      ctx.moveTo(x, y + 20)
      ctx.lineTo(x + horizontalSpacing, y + 60)
      ctx.stroke()
      drawTree(ctx, node.right, x + horizontalSpacing, y + 80, horizontalSpacing / 2)
    }
  }

  const insertNode = (value: number) => {
    const insert = (node: TreeNode | null, val: number): TreeNode => {
      if (!node) return { value: val, left: null, right: null }
      if (val < node.value) node.left = insert(node.left, val)
      else if (val > node.value) node.right = insert(node.right, val)
      return node
    }
    setTree((prevTree) => insert(prevTree, value))
  }

  const handleInsert = () => {
    const value = Math.floor(Math.random() * 100)
    insertNode(value)
  }

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={400} height={300} className="border border-gray-300 rounded" />
      <Button onClick={handleInsert} className="mt-4">
        Insert Random Node
      </Button>
    </div>
  )
}

export default TreeVisualization

