import { useMemo } from 'react'
import { inlineFormat } from '../lib/inlineMarkdown'
import type { SolutionHighlight } from '../lib/solutionHighlights'
import { SolutionCodeLegend } from './SolutionCodeLegend'
import { annotateSolutionCode as wrapSolutionCodeTokens } from '../utils/annotateSolutionCode'

type Block =
  | { type: 'h1' | 'h2' | 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'code'; text: string }

function parseMarkdown(source: string): Block[] {
  const blocks: Block[] = []
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  let i = 0
  let inCode = false
  let codeBuf: string[] = []

  const flushCode = () => {
    if (codeBuf.length) {
      blocks.push({ type: 'code', text: codeBuf.join('\n') })
      codeBuf = []
    }
  }

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('```')) {
      if (inCode) {
        inCode = false
        flushCode()
      } else {
        flushCode()
        inCode = true
      }
      i++
      continue
    }

    if (inCode) {
      codeBuf.push(line)
      i++
      continue
    }

    if (line.startsWith('#### ')) {
      blocks.push({ type: 'h3', text: line.slice(5) })
      i++
      continue
    }
    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4) })
      i++
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3) })
      i++
      continue
    }
    if (line.startsWith('# ')) {
      blocks.push({ type: 'h1', text: line.slice(2) })
      i++
      continue
    }

    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      blocks.push({ type: 'ul', items })
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      blocks.push({ type: 'ol', items })
      continue
    }

    if (line.trim() === '') {
      i++
      continue
    }

    blocks.push({ type: 'p', text: line })
    i++
  }

  flushCode()
  return blocks
}

type MarkdownViewProps = {
  source: string
  /** Challenge-specific tooltips for fenced solution code blocks. */
  solutionHighlights?: SolutionHighlight[]
}

export function MarkdownView({ source, solutionHighlights }: MarkdownViewProps) {
  const blocks = useMemo(() => parseMarkdown(source), [source])
  const annotateCode = solutionHighlights && solutionHighlights.length > 0

  if (!source.trim()) {
    return <p className="empty-md">No content.</p>
  }

  return (
    <article className={`markdown${annotateCode ? ' markdown--solution' : ''}`}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h1':
            return <h1 key={i}>{inlineFormat(block.text)}</h1>
          case 'h2':
            return <h2 key={i}>{inlineFormat(block.text)}</h2>
          case 'h3':
            return <h3 key={i}>{inlineFormat(block.text)}</h3>
          case 'p':
            return <p key={i}>{inlineFormat(block.text)}</p>
          case 'ul':
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{inlineFormat(item)}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{inlineFormat(item)}</li>
                ))}
              </ol>
            )
          case 'code':
            if (annotateCode && solutionHighlights) {
              return (
                <div key={i} className="solution-code-block-wrap">
                  <pre className="solution-code-pre">
                    <code>{wrapSolutionCodeTokens(block.text, solutionHighlights, `sol-${i}`)}</code>
                  </pre>
                  <SolutionCodeLegend code={block.text} highlights={solutionHighlights} />
                </div>
              )
            }
            return (
              <pre key={i}>
                <code>{block.text}</code>
              </pre>
            )
          default:
            return null
        }
      })}
    </article>
  )
}
