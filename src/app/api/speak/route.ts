// src/app/api/speak/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { text } = await req.json()

  // Simulate audio generation
  const audioUrl = `https://fake-audio-service.com/speech/${encodeURIComponent(
    text
  )}.mp3`

  return NextResponse.json({
    audioUrl,
  })
}
