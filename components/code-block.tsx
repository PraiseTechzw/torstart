"use client"

import type React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface CodeBlockProps {
  code: string
  language: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <SyntaxHighlighter language={language} style={vscDarkPlus} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock

