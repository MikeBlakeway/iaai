// /src/services/generateVideo.ts
export async function generateVideo(image: File, action: string): Promise<string> {
    const formData = new FormData()
    formData.append('image', image)
    formData.append('action', action)

    const res = await fetch('http://localhost:8000/generate-video', {
      method: 'POST',
      body: formData
    })

    const blob = await res.blob()
    return URL.createObjectURL(blob)
  }
