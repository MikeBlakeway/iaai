// src/utils/highlightToReact.tsx
import { codeToTokens, type BundledLanguage } from 'shiki';
import type { ReactNode } from 'react';

export async function highlightToReact(code: string, lang = 'tsx' as BundledLanguage ): Promise<ReactNode[]> {

    const { tokens } = await codeToTokens(code, {
  lang,
  theme: 'night-owl'
})


  return tokens.map((line, i) => (
    <div key={i} className="flex">
      {line.map((token, j) => (
        <span key={j} style={{ color: token.color ?? undefined }}>
          {token.content}
        </span>
      ))}
    </div>
  ))
}
