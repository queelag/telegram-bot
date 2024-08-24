import type { FetchError } from '@aracna/core'
import type { ReopenForumTopic, ReopenGeneralForumTopic } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function forumTopic(token: string, body: ReopenForumTopic): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, ReopenForumTopic>('reopenForumTopic', body, { token })
}

export async function generalForumTopic(token: string, body: ReopenGeneralForumTopic): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, ReopenGeneralForumTopic>('reopenGeneralForumTopic', body, { token })
}
