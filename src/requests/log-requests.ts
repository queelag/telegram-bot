import type { FetchError } from '@aracna/core'
import { TelegramAPI } from '../apis/telegram-api.js'
import type { TelegramApiConfig } from '../definitions/interfaces.js'

export async function logOut(config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post('logOut', undefined, config)
}
