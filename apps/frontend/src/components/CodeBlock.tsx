// src/components/CodeBlock.tsx
'use client'

import { ReactNode } from 'react'
import { extractTextFromNodeList } from '@/utils/reactNodeUtils'

interface CodeBlockProps {
  codeNodes: ReactNode[]
  onCopy?: (nodes: ReactNode[]) => string
}

export default function CodeBlock({ codeNodes, onCopy = extractTextFromNodeList }: CodeBlockProps) {
  const handleCopy = () => {
    const extracted = onCopy(codeNodes)
    navigator.clipboard.writeText(extracted).catch(() => alert('Copy failed'))
  }

  return (
    <div className='relative group my-2'>
      <pre className='bg-gray-900 text-sm p-4 rounded-md overflow-x-auto whitespace-pre-wrap'>
        <code>{codeNodes}</code>
      </pre>
      <button
        className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition-opacity'
        onClick={handleCopy}
      >
        Copy
      </button>
    </div>
  )
}
