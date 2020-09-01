import { File, UploadStickerFile } from '@queelag/telegram-types'
import { InputFile } from '../definitions/types'
import Child from '../modules/child'

class Upload extends Child {
  async stickerFile(user: number, png: InputFile): Promise<File | Error> {
    return this.telegram.api.post<UploadStickerFile, File>('uploadStickerFile', { user_id: user, png_sticker: png })
  }
}

export default Upload
