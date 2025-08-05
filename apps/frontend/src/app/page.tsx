'use client'

import Layout from '@/layout/Layout'
import Header from '@/components/Header'
import Avatar from '@/components/Avatar'
import ChatArea from '@/components/ChatArea'
import InputBar from '@/components/InputBar'
import { useChat } from '@/hooks/useChat'

export default function Home() {
  const { chat, completedIndexes, loading, sendMessage } = useChat()

  return (
    <Layout>
      <Header />
      <main className='flex flex-col flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full'>
        <Avatar />
        <ChatArea messages={chat} completedIndexes={completedIndexes} />
        <InputBar onSend={sendMessage} />
        {loading && <p className='text-sm text-gray-400'>Thinking…</p>}
      </main>
    </Layout>
  )
}
