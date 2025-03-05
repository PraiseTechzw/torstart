"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface SearchingVisualizationProps {
  type: string
}

const SearchingVisualization: React.FC<SearchingVisualizationProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [array, setArray] = useState<number[]>([])
  const [searchValue, setSearchValue] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [found, setFound] = useState<boolean | null>(null)

  useEffect(() => {
    setArray(Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)))
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        drawArray(ctx)
      }
    }
  }, [array])

  const drawArray = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const elementWidth = 40
    const elementHeight = 40
    const startX = 20
    const startY = 50

    array.forEach((value, index) => {
      ctx.fillStyle = index === currentIndex ? "#FFA500" : "#4CAF50"
      if (found !== null && index === currentIndex) {
        ctx.fillStyle = found ? "#4CAF50" : "#FF0000"
      }
      ctx.fillRect(startX + index * (elementWidth + 10), startY, elementWidth, elementHeight)
      ctx.fillStyle = "white"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(
        value.toString(),
        startX + index * (elementWidth + 10) + elementWidth / 2,
        startY + elementHeight / 2,
      )
    })
  }

  const linearSearch = async () => {
    setFound(null)
    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i)
      await new Promise((resolve) => setTimeout(resolve, 500))
      if (array[i] === searchValue) {
        setFound(true)
        return
      }
    }
    setFound(false)
  }

  const binarySearch = async () => {
    setFound(null)
    let left = 0
    let right = array.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      setCurrentIndex(mid)
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (array[mid] === searchValue) {
        setFound(true)
        return
      } else if (array[mid] < searchValue) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    setFound(false)
  }

  const handleSearch = () => {
    if (searchValue === null) return
    if (type === "linear-search") {
      linearSearch()
    } else if (type === "binary-search") {
      const sortedArray = [...array].sort((a, b) => a - b)
      setArray(sortedArray)
      binarySearch()
    }
  }

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={500} height={150} className="border border-gray-300 rounded" />
      <div className="mt-4 flex items-center">
        <input
          type="number"
          value={searchValue || ""}
          onChange={(e) => setSearchValue(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
          placeholder="Enter search value"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  )
}

export default SearchingVisualization

