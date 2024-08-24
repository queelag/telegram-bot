import type { FetchError } from '@aracna/core'
import type { LeaveChat } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Leave extends Child {
  async chat(chatID: bigint, parameters?: Partial<LeaveChat>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, LeaveChat>('leaveChat', { chat_id: chatID, ...parameters })
  }
}
