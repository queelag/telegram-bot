import { File } from '@queelag/telegram-types'
import API from '../modules/api'
import Child from '../modules/child'

class Download extends Child {
  api: API = new API('api.telegram.org', '/file/bot' + this.telegram.token + '/')

  async file(id: string): Promise<Buffer | Error> {
    let file: File | Error, buffer: Buffer | Error

    file = await this.telegram.get.file(id)
    if (file instanceof Error) return file

    buffer = await this.api.get<Buffer>(file.file_path)
    if (buffer instanceof Error) return buffer

    return buffer
  }
}

export default Download
