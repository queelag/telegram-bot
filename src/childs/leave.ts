import { FetchError } from '@aracna/core'
import { Child } from '../modules/child'

export class Leave extends Child {
  async chat(id: number): Promise<boolean | FetchError> {
    return this.telegram.api.post('leaveChat', { chat_id: id })
  }
}
