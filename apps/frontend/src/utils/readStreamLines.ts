// src/utils/readStreamLines.ts

/**
 * Reads a streamed response line-by-line, handling chunk boundaries
 * and buffering incomplete JSON lines until they're complete.
 *
 * Each complete line is passed to the callback as a parsed JSON object.
 */
export async function readStreamLines(
  stream: ReadableStream<Uint8Array> | null,
  onLine: (data: Record<string, any>) => void
): Promise<void> {
  if (!stream) return

  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    let boundary = buffer.lastIndexOf('\n')
    if (boundary === -1) continue

    const lines = buffer.slice(0, boundary).split('\n')
    buffer = buffer.slice(boundary + 1)

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue

      try {
        const json = JSON.parse(trimmed)
        onLine(json)
      } catch (err) {
        console.warn('Stream JSON parse error:', err, trimmed)
      }
    }
  }
}
