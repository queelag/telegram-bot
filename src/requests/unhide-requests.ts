import type { FetchError } from '@aracna/core'
import type { HideGeneralForumTopic } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api.js'
import type { TelegramApiConfig } from '../definitions/interfaces.js'

export async function unhideGeneralForumTopic(body: HideGeneralForumTopic, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, HideGeneralForumTopic>('unhideGeneralForumTopic', body, config)
}
