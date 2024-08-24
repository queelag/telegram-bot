import type { FetchError } from '@aracna/core'
import type { ForwardMessage, ForwardMessages, Message, MessageId } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Forward extends Child {
  async message(messageID: number, parameters: Omit<ForwardMessage, 'message_id'>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, ForwardMessage>('forwardMessage', { message_id: messageID, ...parameters })
  }

  async messages(messageIDs: number[], parameters: Omit<ForwardMessages, 'message_ids'>): Promise<MessageId[] | FetchError> {
    return this.telegram.api.post<MessageId[], ForwardMessages>('forwardMessages', { message_ids: messageIDs, ...parameters })
  }
}
