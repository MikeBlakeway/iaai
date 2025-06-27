// src/hooks/useTextToSpeech.ts

import { useRef, useEffect } from 'react'

export function useTextToSpeech() {
  const audioQueue = useRef<Blob[]>([])
  const audioElement = useRef<HTMLAudioElement | null>(null)
  const isPlaying = useRef(false)

  useEffect(() => {
    audioElement.current = new Audio()

    const handleEnded = () => {
      isPlaying.current = false
      playNext()
    }

    audioElement.current.addEventListener('ended', handleEnded)
    return () => {
      audioElement.current?.removeEventListener('ended', handleEnded)
    }
  }, [])

  const playNext = () => {
    if (isPlaying.current || audioQueue.current.length === 0) return

    const nextBlob = audioQueue.current.shift()
    if (!nextBlob) return

    const url = URL.createObjectURL(nextBlob)
    if (audioElement.current) {
      audioElement.current.src = url
      audioElement.current.play()
      isPlaying.current = true
    }
  }

  const queueSpeech = async (text: string) => {
    try {
      const res = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })

      if (!res.ok || !res.body) throw new Error('Failed to fetch TTS')

      const reader = res.body.getReader()
      const chunks: Uint8Array[] = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        if (value) chunks.push(value)
      }

      const blob = new Blob(chunks as BlobPart[], { type: 'audio/mpeg' })
      audioQueue.current.push(blob)
      playNext()
    } catch (err) {
      console.error('TTS Error:', err)
    }
  }

  const flushQueue = () => {
    audioQueue.current = []
    if (audioElement.current) {
      audioElement.current.pause()
      audioElement.current.currentTime = 0
    }
    isPlaying.current = false
  }

  return { queueSpeech, flushQueue }
}

// // src/hooks/useTextToSpeech.ts
// import { useCallback, useRef } from 'react'

// export function useTextToSpeech() {
//   const queueRef = useRef<string[]>([])
//   const isPlayingRef = useRef(false)

//   const playNext = useCallback(() => {
//     if (queueRef.current.length === 0) {
//       isPlayingRef.current = false
//       return
//     }

//     const nextText = queueRef.current.shift()
//     if (!nextText) return

//     isPlayingRef.current = true

//     fetch('/api/speak', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ text: nextText })
//     })
//       .then(res => res.arrayBuffer())
//       .then(buffer => {
//         const blob = new Blob([buffer], { type: 'audio/mpeg' })
//         const url = URL.createObjectURL(blob)
//         const audio = new Audio(url)
//         audio.onended = () => {
//           URL.revokeObjectURL(url)
//           playNext()
//         }
//         audio.onerror = () => {
//           console.error('TTS playback error')
//           playNext()
//         }
//         audio.play()
//       })
//       .catch(err => {
//         console.error('TTS fetch error:', err)
//         playNext()
//       })
//   }, [])

//   const speak = useCallback(
//     (text: string) => {
//       queueRef.current.push(text)
//       if (!isPlayingRef.current) {
//         playNext()
//       }
//     },
//     [playNext]
//   )

//   return { speak }
// }
