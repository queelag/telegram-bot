import type { FetchError } from '@aracna/core'
import type { HideGeneralForumTopic } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function generalForumTopic(token: string, body: HideGeneralForumTopic): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, HideGeneralForumTopic>('hideGeneralForumTopic', body, { token })
}
