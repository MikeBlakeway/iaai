// src/components/ChatArea.tsx
'use client'
import { useEffect, useMemo, useRef } from 'react'
import type { ChatMessage } from '@/types/ChatMessage'
import { useHighlighting } from '@/hooks/useHighlighting'
import { renderMessages } from '@/utils/renderMessages'

interface ChatAreaProps {
  messages: ChatMessage[]
  completedIndexes: Set<number>
}

export default function ChatArea({ messages, completedIndexes }: ChatAreaProps) {
  const chatRef = useRef<HTMLDivElement | null>(null)

  const highlighted = useHighlighting(messages, completedIndexes)

  const rendered = useMemo(() => renderMessages(messages, highlighted), [messages, highlighted])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [])

  return (
    <div
      ref={chatRef}
      className='flex flex-col flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow h-[400px]'
    >
      {rendered}
    </div>
  )
}
