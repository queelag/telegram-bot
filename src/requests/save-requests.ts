import type { FetchError } from '@aracna/core'
import type { SavePreparedInlineMessage } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function savePreparedInlineMessage(body: SavePreparedInlineMessage, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SavePreparedInlineMessage>('savePreparedInlineMessage', body, config)
}
