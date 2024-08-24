import type { FetchError } from '@aracna/core'
import type { CloseForumTopic, CloseGeneralForumTopic } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Close extends Child {
  async forumTopic(chatID: bigint, messageThreadID: number, parameters?: Partial<CloseForumTopic>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, CloseForumTopic>('closeForumTopic', { chat_id: chatID, message_thread_id: messageThreadID, ...parameters })
  }

  async generalForumTopic(chatID: bigint, parameters?: Partial<CloseGeneralForumTopic>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, CloseGeneralForumTopic>('closeGeneralForumTopic', { chat_id: chatID, ...parameters })
  }
}
