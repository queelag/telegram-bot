import type { FetchError } from '@aracna/core'
import type { File, UploadStickerFile } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function uploadStickerFile(body: UploadStickerFile, config?: TelegramApiConfig): Promise<File | FetchError> {
  return TelegramAPI.post<File, UploadStickerFile>('uploadStickerFile', body, config)
}
