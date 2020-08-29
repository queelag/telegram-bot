import crypto from 'crypto'
import Regex from './regex'

class ID {
  static unique(exclude: string[]): string {
    let id: string

    while (true) {
      id = crypto.randomBytes(ID.size / 2).toString('hex')
      if (!exclude.includes(id)) break
    }

    return id
  }

  static check(value: string): boolean {
    return Regex.id.test(value)
  }

  static get size(): number {
    return 16
  }
}

export default ID
