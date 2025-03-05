"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AlgorithmVisualizationProps {
  type: string
}

const AlgorithmVisualization: React.FC<AlgorithmVisualizationProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(1)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw the algorithm visualization based on the type and current step
    switch (type) {
      case "algorithm-basics":
        drawAlgorithmBasics(ctx, currentStep)
        break
      case "algorithm-complexity":
        drawAlgorithmComplexity(ctx, currentStep)
        break
      case "asymptotic-analysis":
        drawAsymptoticAnalysis(ctx, currentStep)
        break
      case "bubble-sort":
        drawBubbleSort(ctx, currentStep)
        break
      case "binary-search":
        drawBinarySearch(ctx, currentStep)
        break
    }
  }, [type, currentStep])

  const drawAlgorithmBasics = (ctx: CanvasRenderingContext2D, step: number) => {
    const steps = ["Problem", "Input", "Process", "Output", "Efficiency", "Correctness"]

    ctx.font = "20px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    const boxWidth = 120
    const boxHeight = 60
    const startX = 200
    const startY = 50
    const arrowLength = 40

    steps.forEach((stepText, index) => {
      const x = startX
      const y = startY + index * (boxHeight + arrowLength)

      ctx.fillStyle = index <= step ? "#4caf50" : "#e0e0e0"
      ctx.fillRect(x - boxWidth / 2, y, boxWidth, boxHeight)
      ctx.strokeRect(x - boxWidth / 2, y, boxWidth, boxHeight)

      ctx.fillStyle = "black"
      ctx.fillText(stepText, x, y + boxHeight / 2)

      if (index < steps.length - 1) {
        ctx.beginPath()
        ctx.moveTo(x, y + boxHeight)
        ctx.lineTo(x, y + boxHeight + arrowLength)
        ctx.stroke()

        // Draw arrowhead
        ctx.beginPath()
        ctx.moveTo(x - 5, y + boxHeight + arrowLength - 5)
        ctx.lineTo(x, y + boxHeight + arrowLength)
        ctx.lineTo(x + 5, y + boxHeight + arrowLength - 5)
        ctx.fill()
      }
    })
  }

  const drawAlgorithmComplexity = (ctx: CanvasRenderingContext2D, step: number) => {
    const complexities = [
      { name: "O(1)", color: "#4caf50" },
      { name: "O(log n)", color: "#2196f3" },
      { name: "O(n)", color: "#ff9800" },
      { name: "O(n log n)", color: "#9c27b0" },
      { name: "O(n^2)", color: "#f44336" },
      { name: "O(2^n)", color: "#795548" },
    ]

    const graphWidth = 300
    const graphHeight = 200
    const startX = 50
    const startY = 220

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX, startY - graphHeight)
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX + graphWidth, startY)
    ctx.stroke()

    // Label axes
    ctx.font = "14px Arial"
    ctx.fillStyle = "black"
    ctx.fillText("Input size (n)", startX + graphWidth / 2, startY + 20)
    ctx.save()
    ctx.translate(startX - 20, startY - graphHeight / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText("Time", 0, 0)
    ctx.restore()

    // Draw complexity curves
    complexities.forEach((complexity, index) => {
      if (index <= step) {
        ctx.beginPath()
        ctx.strokeStyle = complexity.color
        ctx.lineWidth = 2

        for (let x = 0; x <= graphWidth; x += 5) {
          const n = (x / graphWidth) * 10
          let y
          switch (complexity.name) {
            case "O(1)":
              y = 10
              break
            case "O(log n)":
              y = 10 * Math.log2(n + 1)
              break
            case "O(n)":
              y = 20 * n
              break
            case "O(n log n)":
              y = 10 * n * Math.log2(n + 1)
              break
            case "O(n^2)":
              y = 2 * n * n
              break
            case "O(2^n)":
              y = Math.pow(2, n)
              break
            default:
              y = 0
          }
          y = Math.min(y, graphHeight)
          ctx.lineTo(startX + x, startY - y)
        }
        ctx.stroke()

        // Label the curve
        ctx.fillStyle = complexity.color
        ctx.fillText(complexity.name, startX + graphWidth + 10, startY - graphHeight + index * 20)
      }
    })
  }

  const drawAsymptoticAnalysis = (ctx: CanvasRenderingContext2D, step: number) => {
    const notations = [
      { name: "O (Big O)", color: "#f44336", description: "Upper bound" },
      { name: "Ω (Omega)", color: "#4caf50", description: "Lower bound" },
      { name: "Θ (Theta)", color: "#2196f3", description: "Tight bound" },
    ]

    const graphWidth = 300
    const graphHeight = 200
    const startX = 50
    const startY = 220

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX, startY - graphHeight)
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX + graphWidth, startY)
    ctx.stroke()

    // Label axes
    ctx.font = "14px Arial"
    ctx.fillStyle = "black"
    ctx.fillText("Input size (n)", startX + graphWidth / 2, startY + 20)
    ctx.save()
    ctx.translate(startX - 20, startY - graphHeight / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText("Time", 0, 0)
    ctx.restore()

    // Draw asymptotic notations
    notations.forEach((notation, index) => {
      if (index <= step) {
        ctx.beginPath()
        ctx.strokeStyle = notation.color
        ctx.lineWidth = 2

        for (let x = 0; x <= graphWidth; x += 5) {
          const n = (x / graphWidth) * 10
          let y
          switch (notation.name) {
            case "O (Big O)":
              y = 20 * n
              break
            case "Ω (Omega)":
              y = 10 * Math.log2(n + 1)
              break
            case "Θ (Theta)":
              y = 15 * Math.sqrt(n)
              break
            default:
              y = 0
          }
          y = Math.min(y, graphHeight)
          ctx.lineTo(startX + x, startY - y)
        }
        ctx.stroke()

        // Label the notation
        ctx.fillStyle = notation.color
        ctx.fillText(`${notation.name}: ${notation.description}`, startX, startY - graphHeight + index * 20)
      }
    })
  }

  const drawBubbleSort = (ctx: CanvasRenderingContext2D, step: number) => {
    const arr = [5, 2, 8, 12, 1, 6]
    const sortedIndices = []
    for (let i = 0; i < step; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
      }
      sortedIndices.push(arr.length - 1 - i)
    }

    const barWidth = 40
    const barSpacing = 10
    const maxBarHeight = 200
    const startX = 50
    const startY = 220

    arr.forEach((value, index) => {
      const barHeight = (value / Math.max(...arr)) * maxBarHeight
      const x = startX + index * (barWidth + barSpacing)
      const y = startY - barHeight

      ctx.fillStyle = sortedIndices.includes(index)
        ? "#4caf50"
        : index === step % arr.length || index === (step % arr.length) + 1
          ? "#ff9800"
          : "#2196f3"
      ctx.fillRect(x, y, barWidth, barHeight)

      ctx.fillStyle = "black"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.fillText(value.toString(), x + barWidth / 2, startY + 20)
    })
  }

  const drawBinarySearch = (ctx: CanvasRenderingContext2D, step: number) => {
    const arr = [1, 3, 5, 7, 9, 11, 13, 15]
    const target = 7
    const elementWidth = 50
    const elementHeight = 50
    const startX = 50
    const startY = 100

    let left = 0
    let right = arr.length - 1
    let mid = Math.floor((left + right) / 2)

    for (let i = 0; i < step && left <= right; i++) {
      mid = Math.floor((left + right) / 2)
      if (arr[mid] === target) {
        break
      } else if (arr[mid] < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    arr.forEach((element, index) => {
      const x = startX + index * elementWidth
      const y = startY

      ctx.fillStyle = index === mid ? "#ff9800" : index >= left && index <= right ? "#2196f3" : "#e0e0e0"
      ctx.fillRect(x, y, elementWidth, elementHeight)
      ctx.strokeRect(x, y, elementWidth, elementHeight)

      ctx.fillStyle = "black"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(element.toString(), x + elementWidth / 2, y + elementHeight / 2)
    })

    // Draw target value
    ctx.fillStyle = "black"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`Target: ${target}`, startX + (arr.length * elementWidth) / 2, startY - 20)

    // Draw pointers
    ctx.fillStyle = "#4caf50"
    ctx.beginPath()
    ctx.moveTo(startX + left * elementWidth + elementWidth / 2, startY + elementHeight + 10)
    ctx.lineTo(startX + left * elementWidth + elementWidth / 2, startY + elementHeight + 30)
    ctx.stroke()
    ctx.fillText("L", startX + left * elementWidth + elementWidth / 2, startY + elementHeight + 45)

    ctx.fillStyle = "#f44336"
    ctx.beginPath()
    ctx.moveTo(startX + right * elementWidth + elementWidth / 2, startY + elementHeight + 10)
    ctx.lineTo(startX + right * elementWidth + elementWidth / 2, startY + elementHeight + 30)
    ctx.stroke()
    ctx.fillText("R", startX + right * elementWidth + elementWidth / 2, startY + elementHeight + 45)

    ctx.fillStyle = "#ff9800"
    ctx.beginPath()
    ctx.moveTo(startX + mid * elementWidth + elementWidth / 2, startY + elementHeight + 10)
    ctx.lineTo(startX + mid * elementWidth + elementWidth / 2, startY + elementHeight + 30)
    ctx.stroke()
    ctx.fillText("M", startX + mid * elementWidth + elementWidth / 2, startY + elementHeight + 45)
  }

  const handlePlay = () => {
    setIsPlaying(true)
    animationRef.current = requestAnimationFrame(animate)
  }

  const handlePause = () => {
    setIsPlaying(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const animate = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1
      if (nextStep >= getMaxSteps()) {
        handlePause()
        return prevStep
      }
      return nextStep
    })
    animationRef.current = requestAnimationFrame(animate)
  }

  const getMaxSteps = () => {
    switch (type) {
      case "algorithm-basics":
        return 6
      case "algorithm-complexity":
        return 6
      case "asymptotic-analysis":
        return 3
      case "bubble-sort":
        return 15
      case "binary-search":
        return 4
      default:
        return 10
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-96 bg-white dark:bg-slate-800 rounded-lg shadow-md"
    >
      <canvas ref={canvasRef} width={400} height={300} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 space-x-2">
        <Button onClick={handlePlay} disabled={isPlaying}>
          Play
        </Button>
        <Button onClick={handlePause} disabled={!isPlaying}>
          Pause
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <div className="absolute bottom-4 right-4 w-32">
        <Slider value={[speed]} min={0.5} max={2} step={0.1} onValueChange={(value) => setSpeed(value[0])} />
        <p className="text-center mt-2">Speed: {speed.toFixed(1)}x</p>
      </div>
    </motion.div>
  )
}

export default AlgorithmVisualization

