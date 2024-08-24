import type { FetchError } from '@aracna/core'
import type { ReopenForumTopic, ReopenGeneralForumTopic } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Reopen extends Child {
  async forumTopic(chatID: bigint, messageThreadID: number, parameters?: Partial<ReopenForumTopic>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, ReopenForumTopic>('reopenForumTopic', { chat_id: chatID, message_thread_id: messageThreadID, ...parameters })
  }

  async generalForumTopic(chatID: bigint, parameters?: Partial<ReopenGeneralForumTopic>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, ReopenGeneralForumTopic>('reopenGeneralForumTopic', { chat_id: chatID, ...parameters })
  }
}
