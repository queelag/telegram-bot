import type { FetchError } from '@aracna/core'
import type { PromoteChatMember } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Promote extends Child {
  async chatMember(parameters: PromoteChatMember): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, PromoteChatMember>('promoteChatMember', parameters)
  }
}
