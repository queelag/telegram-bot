import { FetchError, FetchResponse } from '@aracna/core'
import { File, PhotoSize, UserProfilePhotos } from '@aracna/telegram-bot-types'
import { API } from '../modules/api'
import { Child } from '../modules/child'

export class Download extends Child {
  api: API = new API('https://api.telegram.org/file/bot' + this.telegram.token + '/')

  async file(id: string): Promise<Buffer | FetchError> {
    let file: File | FetchError, buffer: FetchResponse<Buffer> | FetchError

    file = await this.telegram.get.file(id)
    if (file instanceof Error) return file

    buffer = await this.api.get(file.file_path ?? '')
    if (buffer instanceof Error) return buffer

    return buffer.data
  }

  async userFirstProfilePhoto(id: number): Promise<Buffer | FetchError | Error> {
    let photos: UserProfilePhotos | FetchError, sizes: PhotoSize[][], buffer: Buffer | Error

    photos = await this.telegram.get.userProfilePhotos(id, { limit: 1 })
    if (photos instanceof Error) return photos

    sizes = photos.photos
    if (sizes.length <= 0) return new Error(JSON.stringify(photos))

    buffer = await this.file(sizes[0].reduce((r: PhotoSize, v: PhotoSize) => (v.height + v.width > r.height + r.width ? v : r), sizes[0][0]).file_id)
    if (buffer instanceof Error) return buffer

    return buffer
  }
}
