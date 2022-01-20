export class HTMLUtils {
  static tags: string[] = ['b', 'strong', 'i', 'em', 'u', 'ins', 's', 'strike', 'del', 'span', 'tg-spoiler', 'a', 'code', 'pre', '/', '"']

  static sanitize(text: string): string {
    return text
      .replace(new RegExp(`<(?!(${this.tags.join('|')}))`, 'gm'), '&lt;')
      .replace(new RegExp(`(?<!(${this.tags.join('|')}))>`, 'gm'), '&gt;')
      .replace(/&/gm, '&amp;')
  }
}
