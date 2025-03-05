"use client"

import type React from "react"

interface GraphVisualizationProps {
  type: string
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({ type }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <p className="text-center text-gray-600 dark:text-gray-400">
        Graph visualization for {type} will be implemented here.
      </p>
    </div>
  )
}

export default GraphVisualization

