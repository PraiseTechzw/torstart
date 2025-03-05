"use client"

import type React from "react"

interface SortingVisualizationProps {
  type: string
}

const SortingVisualization: React.FC<SortingVisualizationProps> = ({ type }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <p className="text-center text-gray-600 dark:text-gray-400">
        Sorting visualization for {type} will be implemented here.
      </p>
    </div>
  )
}

export default SortingVisualization

