'use client'

import { useState } from 'react'
import Layout from '@/layout/Layout'
import Header from '@/components/Header'
import Avatar from '@/components/Avatar'
import ChatArea from '@/components/ChatArea'
import InputBar from '@/components/InputBar'

interface ChatMessage {
  sender: 'user' | 'avatar'
  message: string
}

export default function Home() {
  const [chat, setChat] = useState<ChatMessage[]>([
    { sender: 'avatar', message: 'Hello! How can I assist you today?' },
  ])

  const [loading, setLoading] = useState(false)

const handleSendMessage = async (userText: string) => {
  if (!userText.trim()) return

  const userMsg = { sender: 'user' as const, message: userText }
  const thinkingMsg = { sender: 'avatar' as const, message: 'Thinking…' }

  // 1. Add user message and placeholder
  setChat(prev => [...prev, userMsg, thinkingMsg])
  setLoading(true)

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText }),
    })

    const data = await res.json()
    const reply = data.reply ?? 'Sorry, I didn’t understand that.'

    // 2. Replace last avatar message (the "Thinking...") with actual reply
    setChat(prev => [
      ...prev.slice(0, -1),
      { sender: 'avatar', message: reply },
    ])
  } catch (err) {
    console.error('Chat error:', err)

    // Replace placeholder with error message
    setChat(prev => [
      ...prev.slice(0, -1),
      { sender: 'avatar', message: 'Oops! Something went wrong.' },
    ])
  } finally {
    setLoading(false)
  }
}



  return (
    <Layout>
      <Header />
      <main className="flex flex-col flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full">
        <Avatar />
        <ChatArea messages={chat} />
        <InputBar onSend={handleSendMessage} />
        {loading && <p className="text-sm text-gray-400">Thinking…</p>}
      </main>
    </Layout>
  )
}
