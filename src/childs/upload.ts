import { FetchError } from '@aracna/core'
import { File, UploadStickerFile } from '@aracna/telegram-bot-types'
import { InputFile } from '../definitions/types'
import { Child } from '../modules/child'

export class Upload extends Child {
  async stickerFile(userID: number, format: string, sticker: InputFile): Promise<File | FetchError> {
    return this.telegram.api.post<File, UploadStickerFile>('uploadStickerFile', { sticker: sticker, sticker_format: format, user_id: userID })
  }
}
