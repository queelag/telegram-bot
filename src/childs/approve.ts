import type { FetchError } from '@aracna/core'
import type { ApproveChatJoinRequest } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Approve extends Child {
  async chatJoinRequest(parameters: ApproveChatJoinRequest): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, ApproveChatJoinRequest>('approveChatJoinRequest', parameters)
  }
}
