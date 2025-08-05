import type { HighlightedState } from '@/hooks/useHighlighting'
import type { ChatMessage } from '@/types/ChatMessage'
import { renderSplitContent } from './renderSplitContent'

export const renderMessages = (messages: ChatMessage[], highlighted: HighlightedState) => {
  return messages.map((chat, idx) => {
    const isUser = chat.sender === 'user'
    const isThinking = chat.message === 'Thinking…' && !isUser
    const chunk = highlighted[idx]

    return (
      <div
        key={idx}
        className={`p-3 rounded-lg max-w-[75%] whitespace-pre-wrap ${
          isUser
            ? 'bg-blue-500 text-white self-end'
            : isThinking
            ? 'bg-transparent text-gray-400 italic self-start'
            : 'bg-gray-100 text-gray-800 self-start'
        }`}
      >
        {isThinking ? <em>Thinking…</em> : chunk ? renderSplitContent(chunk) : <p>{chat.message}</p>}
      </div>
    )
  })
}
