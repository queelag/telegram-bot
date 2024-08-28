import type { FetchError } from '@aracna/core'
import type { CloseForumTopic, CloseGeneralForumTopic } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function closeForumTopic(body: CloseForumTopic, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, CloseForumTopic>('closeForumTopic', body, config)
}

export async function closeGeneralForumTopic(body: CloseGeneralForumTopic, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, CloseGeneralForumTopic>('closeGeneralForumTopic', body, config)
}
