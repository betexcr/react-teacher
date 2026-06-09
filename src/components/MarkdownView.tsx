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
  | { type: 'code'; text: string; lang?: string }
  | { type: 'table'; header: string[]; rows: string[][] }

function isTableRow(line: string): boolean {
  const trimmed = line.trim()
  return trimmed.startsWith('|') && trimmed.includes('|', 1)
}

function isTableSeparatorRow(line: string): boolean {
  return isTableRow(line) && /^\|[\s\-:|]+\|?$/.test(line.trim())
}

function parseTableRow(line: string): string[] {
  let inner = line.trim()
  if (inner.startsWith('|')) inner = inner.slice(1)
  if (inner.endsWith('|')) inner = inner.slice(0, -1)
  return inner.split('|').map((cell) => cell.trim())
}

function parseTableBlock(lines: string[], start: number): { block: Block; next: number } | null {
  if (!isTableRow(lines[start])) return null

  const tableLines: string[] = []
  let i = start
  while (i < lines.length && isTableRow(lines[i])) {
    tableLines.push(lines[i])
    i++
  }

  if (tableLines.length < 2) return null

  const header = parseTableRow(tableLines[0])
  let bodyStart = 1
  if (tableLines.length > 1 && isTableSeparatorRow(tableLines[1])) {
    bodyStart = 2
  }

  const rows = tableLines.slice(bodyStart).filter((line) => !isTableSeparatorRow(line)).map(parseTableRow)
  if (rows.length === 0) return null

  return {
    block: { type: 'table', header, rows },
    next: i,
  }
}

function parseMarkdown(source: string): Block[] {
  const blocks: Block[] = []
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  let i = 0
  let inCode = false
  let codeBuf: string[] = []

  let codeLang: string | undefined

  const flushCode = () => {
    if (codeBuf.length) {
      blocks.push({ type: 'code', text: codeBuf.join('\n'), lang: codeLang })
      codeBuf = []
      codeLang = undefined
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
        const info = line.slice(3).trim().toLowerCase()
        codeLang = info || undefined
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

    if (isTableRow(line)) {
      const parsed = parseTableBlock(lines, i)
      if (parsed) {
        blocks.push(parsed.block)
        i = parsed.next
        continue
      }
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

const CODE_LANGS_WITH_TOOLTIPS = new Set(['', 'ts', 'tsx', 'js', 'javascript'])

function codeBlockSupportsTooltips(lang?: string): boolean {
  if (!lang) return true
  return CODE_LANGS_WITH_TOOLTIPS.has(lang)
}

type MarkdownViewProps = {
  source: string
  /** Per-token tooltips for fenced code blocks (challenges, system design). */
  solutionHighlights?: SolutionHighlight[]
  codeHighlightLegend?: string
}

export function MarkdownView({
  source,
  solutionHighlights,
  codeHighlightLegend,
}: MarkdownViewProps) {
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
          case 'table':
            return (
              <div key={i} className="markdown-table-wrap">
                <table>
                  <thead>
                    <tr>
                      {block.header.map((cell, j) => (
                        <th key={j}>{inlineFormat(cell)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k}>{inlineFormat(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'code': {
            const useTooltips =
              annotateCode &&
              solutionHighlights &&
              codeBlockSupportsTooltips(block.lang)
            if (useTooltips) {
              return (
                <div key={i} className="solution-code-block-wrap">
                  <pre className="solution-code-pre">
                    <code>
                      {wrapSolutionCodeTokens(block.text, solutionHighlights, `code-${i}`)}
                    </code>
                  </pre>
                  <SolutionCodeLegend
                    code={block.text}
                    highlights={solutionHighlights}
                    legendLabel={codeHighlightLegend}
                  />
                </div>
              )
            }
            return (
              <pre key={i}>
                <code>{block.text}</code>
              </pre>
            )
          }
          default:
            return null
        }
      })}
    </article>
  )
}
