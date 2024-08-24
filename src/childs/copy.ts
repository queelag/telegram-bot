import type { FetchError } from '@aracna/core'
import type { CopyMessage, CopyMessages, MessageId } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Copy extends Child {
  async message(messageID: number, parameters: Omit<CopyMessage, 'message_id'>): Promise<MessageId | FetchError> {
    return this.telegram.api.post<MessageId, CopyMessage>('copyMessage', { message_id: messageID, ...parameters })
  }

  async messages(messageIDs: number[], parameters: Omit<CopyMessages, 'message_ids'>): Promise<MessageId[] | FetchError> {
    return this.telegram.api.post<MessageId[], CopyMessages>('copyMessages', { message_ids: messageIDs, ...parameters })
  }
}
