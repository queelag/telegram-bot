import type { FetchError } from '@aracna/core'
import type { CloseForumTopic, CloseGeneralForumTopic } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function closeForumTopic(token: string, body: CloseForumTopic): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, CloseForumTopic>('closeForumTopic', body, { token })
}

export async function closeGeneralForumTopic(token: string, body: CloseGeneralForumTopic): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, CloseGeneralForumTopic>('closeGeneralForumTopic', body, { token })
}
