import type { FetchError } from '@aracna/core'
import type { ReopenForumTopic, ReopenGeneralForumTopic } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function reopenForumTopic(body: ReopenForumTopic, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, ReopenForumTopic>('reopenForumTopic', body, config)
}

export async function reopenGeneralForumTopic(body: ReopenGeneralForumTopic, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, ReopenGeneralForumTopic>('reopenGeneralForumTopic', body, config)
}
