import { FetchError } from '@queelag/core'
import { File, UploadStickerFile } from '@queelag/telegram-types'
import { InputFile } from '../definitions/types'
import { Child } from '../modules/child'

export class Upload extends Child {
  async stickerFile(user: number, png: InputFile): Promise<File | FetchError> {
    return this.telegram.api.post<File, UploadStickerFile>('uploadStickerFile', { user_id: user, png_sticker: png })
  }
}
