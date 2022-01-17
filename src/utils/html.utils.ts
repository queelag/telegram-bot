class HTMLUtils {
  static tags: string[] = ['b', 'strong', 'i', 'em', 'code', 's', 'strike', 'del', 'pre', '/']

  static sanitize(text: string): string {
    return text
      .replace(new RegExp(`<(?!(${this.tags.join('|')}))`), '&lt;')
      .replace(new RegExp(`(?<!(${this.tags.join('|')}))>`), '&gt;')
      .replace(/&/gm, '&amp;')
  }
}

export default HTMLUtils
