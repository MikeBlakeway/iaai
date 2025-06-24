// src/app/page.tsx
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

  const handleSendMessage = (text: string) => {
    // Add user message
    const userMsg: ChatMessage = { sender: 'user', message: text }
    setChat((prev) => [...prev, userMsg])

    // Simulate avatar response
    setTimeout(() => {
      const botReply: ChatMessage = {
        sender: 'avatar',
        message: `That's a great question about "${text}". Here's a mock reply.`,
      }
      setChat((prev) => [...prev, botReply])
    }, 600)
  }

  return (
    <Layout>
      <Header />
      <main className="flex flex-col flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full">
        <Avatar />
        <ChatArea messages={chat} />
        <InputBar onSend={handleSendMessage} />
      </main>
    </Layout>
  )
}
