// src/app/api/chat/route.ts
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  const streamRes = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3',
      prompt: message,
      stream: true
    })
  })

  return new Response(streamRes.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  })
}
