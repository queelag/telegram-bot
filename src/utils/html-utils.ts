import { getNumberPercentage } from '@aracna/core'

const tags: string[] = ['b', 'strong', 'i', 'em', 'u', 'ins', 's', 'strike', 'del', 'span', 'tg-spoiler', 'a', 'code', 'pre', '/', '"']

export function getProgressHTML(value: number, min: number = 0, max: number = 100, size: number = 20): string {
  let percentage: number, steps: string[]

  percentage = getNumberPercentage(value, { min, max })
  steps = new Array(size).fill(0).map((_, index: number) => ((index * max) / size < percentage ? '=' : ' '))

  return `<code>[${steps.join('')}]</code>`
}

export function sanitizeHTML(text: string): string {
  return text
    .replace(/&/gm, '&amp;')
    .replace(new RegExp(`<(?!(${tags.join('|')}))`, 'gm'), '&lt;')
    .replace(new RegExp(`(?<!(${tags.join('|')}))>`, 'gm'), '&gt;')
}
