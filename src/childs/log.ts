import type { FetchError } from '@aracna/core'
import { Child } from '../modules/child'

export class Log extends Child {
  async out(): Promise<boolean | FetchError> {
    return this.telegram.api.post('logOut')
  }
}
