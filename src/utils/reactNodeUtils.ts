// src/utils/reactNodeUtils.ts
import { ReactNode, ReactElement, isValidElement, type PropsWithChildren } from 'react'

/**
 * Type guard: identifies ReactElement with a string child
 */
export function isReactElementWithStringChild(node: ReactNode): node is ReactElement<PropsWithChildren> {
  return isValidElement(node) && typeof (node as ReactElement<PropsWithChildren>).props.children === 'string'
}

/**
 * Safely extracts text content from a ReactNode array of styled tokens
 */
export function extractTextFromNodeList(nodes: ReactNode[]): string {
  return nodes
    .map(node => {
      if (typeof node === 'string') return node
      if (typeof node === 'number') return node.toString()
      if (isReactElementWithStringChild(node)) return node.props.children
      return ''
    })
    .join('')
}
