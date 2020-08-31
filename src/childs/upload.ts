import Child from '../modules/child'
import { File, UploadStickerFile } from '@queelag/telegram-types'

class Upload extends Child {
  stickerFile(user: number, png: Buffer): Promise<File | Error> {
    return this.telegram.api.post<UploadStickerFile, File>('uploadStickerFile', { user_id: user, png_sticker: png })
  }
}

export default Upload
