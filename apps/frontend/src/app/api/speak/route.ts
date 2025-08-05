// src/app/api/speak/route.ts

import { NextRequest } from 'next/server'
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'

export const runtime = 'nodejs'

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!
})

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()
    if (!text || typeof text !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing or invalid text' }), { status: 400 })
    }

    const audioStream = await client.textToSpeech.stream('Xb7hH8MSUJpSbSDYk0k2', {
      modelId: 'eleven_multilingual_v2',
      text,
      outputFormat: 'mp3_44100_128',
      voiceSettings: {
        stability: 0.4,
        similarityBoost: 0.8,
        useSpeakerBoost: true,
        speed: 1.0
      }
    })

    const chunks: Uint8Array[] = []
    const reader = audioStream.getReader()

    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      if (value) chunks.push(value)
    }

    const audioBuffer = Buffer.concat(chunks.map(chunk => Buffer.from(chunk)))

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString()
      }
    })
  } catch (err) {
    console.error('[TTS SDK ERROR]', err)
    return new Response(JSON.stringify({ error: 'Failed to stream audio' }), {
      status: 500
    })
  }
}
