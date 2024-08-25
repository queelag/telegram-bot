import type { FetchError } from '@aracna/core'
import { TelegramAPI } from '../apis/telegram-api'

export async function logOut(token: string): Promise<boolean | FetchError> {
  return TelegramAPI.post('logOut', undefined, { token })
}
