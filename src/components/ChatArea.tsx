'use client'
import { useEffect, useRef, useState, type ReactElement, type ReactNode } from 'react'
import { highlightToReact } from '@/utils/highlightToReact'

interface ChatMessage {
  sender: 'user' | 'avatar'
  message: string
}

interface ChatAreaProps {
  messages: ChatMessage[]
}

export default function ChatArea({ messages }: ChatAreaProps) {
  const chatRef = useRef<HTMLDivElement | null>(null)

  // Store each message’s parsed parts (text or code block)
  const [highlighted, setHighlighted] = useState<Record<number, (string | ReactNode[])[]>>({})

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }

    messages.forEach(async (msg, i) => {
      if (msg.sender === 'avatar' && msg.message.includes('```') && !highlighted[i]) {
        const parts = msg.message.split(/```/)
        const content = await Promise.all(
          parts.map(async (part, idx) => {
            if (idx % 2 === 1) {
              return await highlightToReact(part)
            } else {
              return part
            }
          })
        )
        setHighlighted(prev => ({ ...prev, [i]: content }))
      }
    })
  }, [messages, highlighted])

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => alert('Copy failed'))
  }

  const renderSplitContent = (chunks: (string | ReactNode[])[]) => {
    return chunks.map((chunk, i) => {
      if (typeof chunk === 'string') {
        return (
          <p key={i} className='whitespace-pre-wrap'>
            {chunk}
          </p>
        )
      } else {
        return (
          <div key={i} className='relative group my-2'>
            <pre className='bg-gray-900 text-sm p-4 rounded-md overflow-x-auto whitespace-pre-wrap'>
              <code>{chunk}</code>
            </pre>
            <button
              className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition-opacity'
              onClick={() =>
                handleCopy(
                  chunk
                    .map(n => {
                      if (
                        typeof n === 'object' &&
                        n !== null &&
                        'props' in n &&
                        typeof (n as ReactElement<{ children: string }>).props.children === 'string'
                      ) {
                        return (n as ReactElement<{ children: string }>).props.children
                      }
                      return ''
                    })
                    .join('')
                )
              }
            >
              Copy
            </button>
          </div>
        )
      }
    })
  }

  return (
    <div
      ref={chatRef}
      className='flex flex-col flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow h-[400px]'
    >
      {messages.map((chat, idx) => {
        const isUser = chat.sender === 'user'
        const isThinking = chat.message === 'Thinking…' && !isUser
        const parsed = highlighted[idx]

        return (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[75%] whitespace-pre-wrap ${
              isUser
                ? 'bg-blue-500 text-white self-end'
                : isThinking
                ? 'bg-transparent text-gray-400 italic self-start'
                : 'bg-gray-100 text-gray-800 self-start'
            }`}
          >
            {isThinking ? <em>Thinking…</em> : parsed ? renderSplitContent(parsed) : <p>{chat.message}</p>}
          </div>
        )
      })}
    </div>
  )
}
