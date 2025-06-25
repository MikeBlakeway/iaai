import CodeBlock from '@/components/CodeBlock'
import TextBlock from '@/components/TextBlock'
import { extractTextFromNodeList } from './reactNodeUtils'
import type { StreamChunk } from '@/types/StreamChunk'

export const renderSplitContent = (chunks: StreamChunk[]) =>
  chunks.map((chunk, i) =>
    typeof chunk === 'string' ? (
      <TextBlock key={i} content={chunk} />
    ) : (
      <CodeBlock key={i} codeNodes={chunk} onCopy={extractTextFromNodeList} />
    )
  )
