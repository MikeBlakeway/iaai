'use client'

import { useState } from 'react'
import ImageUploader from '@/components/ImageUploader'
import ActionSelector from '@/components/ActionSelector'

export default function ImageToVideoPage() {
  const [image, setImage] = useState<File | null>(null)
  const [action, setAction] = useState<string>('blow_kiss')
  const [isLoading, setIsLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  const actions = [
    { label: 'Blow Kiss', value: 'blow_kiss', imageUrl: '/image/actions/blow_kiss.jpg' },
    { label: 'Kung Fu', value: 'kung_fu', imageUrl: '/image/actions/kung_fu.jpg' },
    { label: 'Smile', value: 'smile', imageUrl: '/image/actions/smile.jpg' },
    { label: 'Dance', value: 'dance', imageUrl: '/image/actions/dance.jpg' }
  ]

  const handleGenerateVideo = async () => {
    if (!image || !action) return

    setIsLoading(true)
    setVideoUrl(null)

    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('action', action)

      const res = await fetch('/api/image-to-video', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) throw new Error('Video generation failed')

      const blob = await res.blob()
      const videoObjectUrl = URL.createObjectURL(blob)
      setVideoUrl(videoObjectUrl)
    } catch (error) {
      console.error(error)
      alert('Failed to generate video. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='max-w-2xl mx-auto py-12 px-4 space-y-10'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-gray-800'>Image to Video Generator</h1>
        <p className='mt-2 text-gray-500 text-sm'>Upload a photo and pick an action. Watch your image come to life!</p>
      </div>

      <ImageUploader
        onUpload={file => {
          setImage(file)
          setVideoUrl(null)
        }}
        loading={isLoading}
      />

      <ActionSelector actions={actions} selected={action} onSelect={val => setAction(val)} disabled={isLoading} />

      <button
        disabled={!image || isLoading}
        onClick={handleGenerateVideo}
        className='w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition disabled:opacity-50'
      >
        {isLoading ? 'Generating video...' : 'Generate Video'}
      </button>

      {videoUrl && (
        <div className='pt-6'>
          <video src={videoUrl} controls className='w-full rounded-lg shadow-lg' />
        </div>
      )}
    </main>
  )
}
;``
