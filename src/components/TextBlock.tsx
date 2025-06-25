// src/components/TextBlock.tsx
'use client'

interface TextBlockProps {
  content: string
}

export default function TextBlock({ content }: TextBlockProps) {
  return <p className="whitespace-pre-wrap">{content}</p>
}