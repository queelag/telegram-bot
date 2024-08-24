import type { FetchError } from '@aracna/core'
import type { HideGeneralForumTopic } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Unhide extends Child {
  async generalForumTopic(chatID: bigint, parameters?: Partial<HideGeneralForumTopic>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, HideGeneralForumTopic>('unhideGeneralForumTopic', { chat_id: chatID, ...parameters })
  }
}
