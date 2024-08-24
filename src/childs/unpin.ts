import type { FetchError } from '@aracna/core'
import type { UnpinAllChatMessages, UnpinAllForumTopicMessages, UnpinAllGeneralForumTopicMessages, UnpinChatMessage } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Unpin extends Child {
  async allChatMessages(chatID: bigint, parameters?: Partial<UnpinAllChatMessages>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, UnpinAllChatMessages>('unpinAllChatMessages', { chat_id: chatID, ...parameters })
  }

  async allForumTopicMessages(chatID: bigint, messageThreadID: number, parameters?: Partial<UnpinAllForumTopicMessages>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, UnpinAllForumTopicMessages>('unpinAllForumTopicMessages', {
      chat_id: chatID,
      message_thread_id: messageThreadID,
      ...parameters
    })
  }

  async allGeneralForumTopicMessages(chatID: bigint, parameters?: Partial<UnpinAllGeneralForumTopicMessages>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, UnpinAllGeneralForumTopicMessages>('unpinAllGeneralForumTopicMessages', { chat_id: chatID, ...parameters })
  }

  async chatMessage(chatID: bigint, parameters?: Partial<UnpinChatMessage>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, UnpinChatMessage>('unpinChatMessage', { chat_id: chatID, ...parameters })
  }
}
