import type { FetchError } from '@aracna/core'
import type { DeclineChatJoinRequest } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Decline extends Child {
  async chatJoinRequest(parameters: DeclineChatJoinRequest): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeclineChatJoinRequest>('declineChatJoinRequest', parameters)
  }
}
