// src/components/VideoPreview.tsx
'use client'

interface Props {
  src: string
}

export default function VideoPreview({ src }: Props) {
  if (!src) return null

  return (
    <div className='mt-4'>
      <label className='block mb-2 text-sm font-medium'>Generated Video</label>
      <video
        src={src}
        controls
        autoPlay
        loop
        className='rounded shadow max-w-full w-[320px]'
      />
    </div>
  )
}
