// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  // Simulated ChatGPT response
  const fakeReply = `You said: "${message}". Here's a helpful response.`

  return NextResponse.json({
    reply: fakeReply,
  })
}
