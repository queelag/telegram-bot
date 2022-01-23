import { FetchError } from '@queelag/core'
import { File, UploadStickerFile } from '@queelag/telegram-types'
import { InputFile } from '../definitions/types'
import { Child } from '../modules/child'

export class Upload extends Child {
  async stickerFile(userID: number, png: InputFile): Promise<File | FetchError> {
    return this.telegram.api.post<File, UploadStickerFile>('uploadStickerFile', { png_sticker: png, user_id: userID })
  }
}
