// src/components/ChatArea.tsx
import { useEffect, useRef } from 'react';

interface ChatAreaProps {
  messages: { sender: 'user' | 'avatar'; message: string }[]
}

export default function ChatArea({ messages }: ChatAreaProps) {
  const chatRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      ref={chatRef}
      className="flex flex-col flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow h-[400px]"
    >
      {messages.map((chat, idx) => (
        <div
          key={idx}
          className={`p-3 rounded-lg max-w-[75%] ${
            chat.sender === 'user'
              ? 'bg-blue-500 text-white self-end'
              : 'bg-gray-200 text-gray-800 self-start'
          }`}
        >
          {chat.message}
        </div>
      ))}
    </div>
  )
}
