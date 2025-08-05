// src/hooks/useHighlighting.ts
import { useEffect, useState } from 'react'
import { highlightToReact } from '@/utils/highlightToReact'
import type { ChatMessage } from '@/types/ChatMessage'
import type { StreamChunk } from '@/types/StreamChunk'

export interface HighlightedState {
  [index: number]: StreamChunk[]
}

export function useHighlighting(messages: ChatMessage[], completedIndexes: Set<number>): HighlightedState {
  const [highlighted, setHighlighted] = useState<HighlightedState>({})

  useEffect(() => {
    messages.forEach(async (msg, i) => {
      const isAvatar = msg.sender === 'avatar'
      const hasCode = msg.message.includes('```')
      const notProcessed = !highlighted[i]
      const isComplete = completedIndexes.has(i)

      if (isAvatar && hasCode && notProcessed && isComplete) {
        const parts = msg.message.split(/```/)
        const content = await Promise.all(
          parts.map(async (part, idx) => (idx % 2 === 1 ? await highlightToReact(part) : part))
        )
        setHighlighted(prev => ({ ...prev, [i]: content }))
      }
    })
  }, [messages, highlighted, completedIndexes])

  return highlighted
}
