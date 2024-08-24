import type { FetchError } from '@aracna/core'
import type { AddStickerToSet, Message } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function addStickerToSet(token: string, body: AddStickerToSet): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, AddStickerToSet>('addStickerToSet', body, { token })
}
