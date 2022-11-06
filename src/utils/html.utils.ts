import { getNumberPercentage } from '@queelag/core'

export class HTMLUtils {
  static tags: string[] = ['b', 'strong', 'i', 'em', 'u', 'ins', 's', 'strike', 'del', 'span', 'tg-spoiler', 'a', 'code', 'pre', '/', '"']

  static sanitize(text: string): string {
    return text
      .replace(new RegExp(`<(?!(${this.tags.join('|')}))`, 'gm'), '&lt;')
      .replace(new RegExp(`(?<!(${this.tags.join('|')}))>`, 'gm'), '&gt;')
      .replace(/&/gm, '&amp;')
  }

  static progress(value: number, minimum: number = 0, maximum: number = 100, size: number = 20): string {
    let percentage: number, steps: string[]

    percentage = getNumberPercentage(value, minimum, maximum)
    steps = new Array(size).fill(0).map((v, k: number) => ((k * maximum) / size < percentage ? '=' : ' '))

    return `<code>[${steps.join('')}]</code>`
  }
}
