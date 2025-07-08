'use client'

import { useState, useRef, DragEvent } from 'react'
import Image from 'next/image'

interface Props {
  onUpload: (file: File) => void
  loading?: boolean
}

export default function ImageUploader({ onUpload, loading = false }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    const file = fileList[0]
    if (!file.type.startsWith('image/')) return

    onUpload(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  const resetImage = () => {
    setPreview(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        preview ? 'border-gray-300 hover:border-red-400' : 'border-gray-300 hover:border-indigo-500'
      } ${loading ? 'pointer-events-none opacity-60' : ''} bg-gray-50`}
    >
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        className='hidden'
        onChange={(e) => handleFiles(e.target.files)}
      />

      {loading ? (
        <div className='flex flex-col items-center gap-2'>
          <div className='w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin'></div>
          <p className='text-sm text-gray-500'>Processing image…</p>
        </div>
      ) : preview ? (
        <div className='flex flex-col items-center gap-2'>
          <Image
            src={preview}
            alt='Uploaded avatar'
            width={128}
            height={128}
            className='rounded-full object-cover border border-gray-300 shadow-sm'
          />
          <p className='text-sm text-gray-600'>Click to change image</p>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation()
              resetImage()
            }}
            className='mt-1 text-xs text-red-500 hover:underline'
          >
            Remove image
          </button>
        </div>
      ) : (
        <div className='space-y-2'>
          <p className='text-gray-600'>Drag & drop or click to upload an image</p>
          <p className='text-xs text-gray-400'>PNG, JPG, JPEG accepted</p>
        </div>
      )}
    </div>
  )
}
