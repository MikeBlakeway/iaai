// src/utils/ttsBatcher.ts

/**
 * Buffers and emits speech batches from a stream of tokens.
 * Sends only full sentences to the TTS system for smoother playback.
 */
export class TTSBatcher {
  private buffer = ''
  private readonly onBatch: (text: string) => void

  constructor(onBatch: (text: string) => void) {
    this.onBatch = onBatch
  }

  /**
   * Call this on every new token from the stream.
   */
  push(token: string) {
    this.buffer += token

    // Match complete sentences (ends with ., !, or ? + optional trailing characters)
    const sentenceRegex = /[^.!?]+[.!?]+[)\]"'`’”]*\s*/g
    const matches = this.buffer.match(sentenceRegex)

    if (matches) {
      for (const sentence of matches) {
        this.onBatch(sentence.trim())
      }
      this.buffer = this.buffer.slice(matches.join('').length)
    }
  }

  /**
   * Flush remaining text when the stream ends.
   */
  flush() {
    const final = this.buffer.trim()
    if (final.length > 0) {
      this.onBatch(final)
      this.buffer = ''
    }
  }
}
