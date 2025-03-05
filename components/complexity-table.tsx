import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ComplexityTableProps {
  timeComplexity: { operation: string; complexity: string }[]
  spaceComplexity: string
}

const ComplexityTable: React.FC<ComplexityTableProps> = ({ timeComplexity, spaceComplexity }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Operation</TableHead>
          <TableHead>Time Complexity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {timeComplexity.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.operation}</TableCell>
            <TableCell>{item.complexity}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>Space Complexity</TableCell>
          <TableCell>{spaceComplexity}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default ComplexityTable

