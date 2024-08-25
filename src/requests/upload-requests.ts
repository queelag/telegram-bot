import type { FetchError } from '@aracna/core'
import type { File, UploadStickerFile } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function uploadStickerFile(token: string, body: UploadStickerFile): Promise<File | FetchError> {
  return TelegramAPI.post<File, UploadStickerFile>('uploadStickerFile', body, { token })
}
