// src/app/api/upload-action/route.ts
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const image = formData.get('image') as Blob | null
    const action = formData.get('action') as string | null

    if (!image || !action) {
      return new Response(JSON.stringify({ error: 'Missing image or action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Forward to local Python itv-api
    const forwardForm = new FormData()
    forwardForm.append('image', image, 'upload.jpg')
    forwardForm.append('action', action)

    const apiRes = await fetch('http://localhost:8000/generate', {
      method: 'POST',
      body: forwardForm
    })

    if (!apiRes.ok) {
      const text = await apiRes.text()
      console.error('[itv-api error]', text)

      return new Response(JSON.stringify({ error: 'Video generation failed at itv-api' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Return video as a stream
    const videoBlob = await apiRes.blob()
    return new Response(videoBlob, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4'
      }
    })
  } catch (err) {
    console.error('[upload-action route error]', err)

    return new Response(JSON.stringify({ error: 'Unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
