/**
 * An advanced TTS batcher that accumulates tokens, detects sentence boundaries,
 * builds coherent context-aware blocks, and emits speech naturally.
 * Skips content inside markdown code blocks, inline code, and structured non-speakable patterns.
 */
export class SmartTTSBatcher {
  private sentenceBuffer: string[] = []
  private currentText = ''
  private readonly onSpeak: (text: string) => void
  private readonly maxSentences: number
  private readonly forceDelayMs: number
  private forceTimeout: NodeJS.Timeout | null = null
  private hasSpoken = false
  private insideCodeBlock = false

  constructor(opts: { onSpeak: (text: string) => void; maxSentences?: number; forceDelayMs?: number }) {
    this.onSpeak = opts.onSpeak
    this.maxSentences = opts.maxSentences ?? 5
    this.forceDelayMs = opts.forceDelayMs ?? 1500
  }

  push(token: string, isFinalChunk: boolean = false) {
    // Track if we're inside a markdown code block (```)
    if (token.includes('```')) {
      const count = (token.match(/```/g) || []).length
      this.insideCodeBlock = count % 2 === 1 ? !this.insideCodeBlock : this.insideCodeBlock
    }

    if (this.insideCodeBlock) return

    // Skip inline code and structured noise
    if (this.isInlineCode(token) || this.looksLikeJson(token) || this.looksLikeStackTrace(token)) return

    if (!this.hasSpoken && !this.forceTimeout) {
      this.forceTimeout = setTimeout(() => {
        if (this.sentenceBuffer.length > 0) {
          this.flushSentences()
        }
      }, this.forceDelayMs)
    }

    this.currentText += token

    // Normalize LLM quirks
    const normalized = this.currentText
      .replace(/\n{2,}/g, ' ') // double line breaks → space
      .replace(/\.{3,}/g, '...') // reduce long ellipses
      .replace(/\s+/g, ' ') // collapse spaces
      .trim()

    const sentenceRegex = /[^.!?]+[.!?]+[)\]"'`’”]*\s*/g
    const matches = normalized.match(sentenceRegex)

    if (matches) {
      for (const sentence of matches) {
        this.sentenceBuffer.push(sentence.trim())
      }
      this.currentText = normalized.slice(matches.join('').length)

      const totalLength = this.totalBufferLength()
      const enoughContext = this.sentenceBuffer.length >= this.maxSentences || totalLength > 500

      if (enoughContext || (isFinalChunk && totalLength > 0)) {
        this.flushSentences()
      }
    } else if (isFinalChunk && this.currentText.trim().length > 0) {
      this.flush()
    }
  }

  private isInlineCode(text: string): boolean {
    return /`[^`]+`/.test(text)
  }

  private looksLikeJson(text: string): boolean {
    return /\{\s*\"\w+\"\s*:\s*.+\}/.test(text) || /\[\{.+\}\]/.test(text)
  }

  private looksLikeStackTrace(text: string): boolean {
    return /\s+at\s+\w+\s+\(/.test(text) || /Exception[:]/.test(text)
  }

  private totalBufferLength(): number {
    return this.sentenceBuffer.reduce((sum, s) => sum + s.length, 0)
  }

  private flushSentences() {
    const block = this.sentenceBuffer.join(' ').trim()
    if (block.length > 0) {
      this.onSpeak(block)
      this.hasSpoken = true
    }
    this.sentenceBuffer = []
    if (this.forceTimeout) {
      clearTimeout(this.forceTimeout)
      this.forceTimeout = null
    }
  }

  flush() {
    if (this.currentText.trim()) {
      this.sentenceBuffer.push(this.currentText.trim())
      this.currentText = ''
    }
    this.flushSentences()
  }
}
