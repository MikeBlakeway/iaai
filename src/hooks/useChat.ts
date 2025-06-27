// src/hooks/useChat.ts
import { useState } from 'react'
import { readStreamLines } from '@/utils/readStreamLines'
import { markMessageAsComplete } from '@/utils/markMessageAsComplete'
import { useTextToSpeech } from './useTextToSpeech'
import { SmartTTSBatcher } from '@/utils/smartTTSBatcher'

export interface ChatMessage {
  sender: 'user' | 'avatar'
  message: string
}

export function useChat() {
  const [chat, setChat] = useState<ChatMessage[]>([{ sender: 'avatar', message: 'Hello! How can I assist you today?' }])
  const [completedIndexes, setCompletedIndexes] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(false)

  const { queueSpeech } = useTextToSpeech()

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return

    const batcher = new SmartTTSBatcher({
      onSpeak: queueSpeech,
      maxSentences: 5,
      forceDelayMs: 1500
    })

    setChat(prev => [...prev, { sender: 'user', message: userText }])

    let avatarIndex = -1
    setChat(prev => {
      avatarIndex = prev.length
      return [...prev, { sender: 'avatar', message: '' }]
    })

    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, voiceMode: true })
      })

      await readStreamLines(res.body, json => {
        if (json.response) {
          batcher.push(json.response)
          setChat(prev => {
            const updated = [...prev]
            const existing = updated[avatarIndex]
            if (existing?.sender === 'avatar') {
              updated[avatarIndex] = {
                ...existing,
                message: existing.message + json.response
              }
            }
            return updated
          })
        }
      })

      batcher.flush()
      markMessageAsComplete(avatarIndex, completedIndexes, setCompletedIndexes)
    } catch (err) {
      console.error('Streaming error:', err)
      setChat(prev => [
        ...prev,
        { sender: 'avatar', message: 'Sorry, something went wrong while streaming the response.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  return {
    chat,
    completedIndexes,
    loading,
    sendMessage
  }
}
