import type { FetchError } from '@aracna/core'
import type { File, UploadStickerFile } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Upload extends Child {
  async stickerFile(userID: bigint, parameters: Omit<UploadStickerFile, 'user_id'>): Promise<File | FetchError> {
    return this.telegram.api.post<File, UploadStickerFile>('uploadStickerFile', { user_id: userID, ...parameters })
  }
}
