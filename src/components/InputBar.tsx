// src/components/InputBar.tsx
'use client'
import { useState } from 'react'

interface InputBarProps {
  onSend: (text: string) => void
}

export default function InputBar({ onSend }: InputBarProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    onSend(input.trim())
    setInput('')
  }

  return (
    <div className="flex p-4 bg-gray-50 shadow rounded-lg space-x-2">
      <input
        type="text"
        placeholder="Ask something..."
        className="flex-1 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  )
}
