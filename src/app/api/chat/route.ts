// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: message,
        stream: false,
      }),
    })

    const data = await res.json()

    return NextResponse.json({ reply: data.response })
  } catch (err) {
    console.error('LLaMA error:', err)
    return NextResponse.json({ error: 'Local LLM error' }, { status: 500 })
  }
}
