import { get } from 'lodash'

class HTMLUtils {
  static blacklist: string[] = ['<', '>', '&']
  static tags: string[] = ['b', 'strong', 'i', 'em', 'u', 'ins', 's', 'strike', 'del', 'a', 'code', 'pre', '/', '"']

  static sanitize(text: string): string {
    let splitted: string[]

    splitted = text.split('')
    text = splitted.reduce((r: string, v: string, k: number) => {
      switch (true) {
        case v === '<' && !this.tags.includes(get(splitted, k + 1, '')):
          return r + '&lt;'
        case v === '>' && !this.tags.includes(get(splitted, k - 1, '')):
          return r + '&gt;'
        case v === '&':
          return r + '&amp;'
        default:
          return r + v
      }
    }, '')

    return text
  }
}

export default HTMLUtils
