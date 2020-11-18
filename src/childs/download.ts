import { File, PhotoSize, UserProfilePhotos } from '@queelag/telegram-types'
import { last, maxBy } from 'lodash'
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

  async userFirstProfilePhoto(id: number): Promise<Buffer | Error> {
    let photos: UserProfilePhotos | Error, sizes: PhotoSize[][], buffer: Buffer | Error

    photos = await this.telegram.get.userProfilePhotos(id, { limit: 1 })
    if (photos instanceof Error) return photos

    sizes = photos.photos
    if (sizes.length <= 0) return new Error(JSON.stringify(photos))

    buffer = await this.file(maxBy(sizes[0], (v: PhotoSize) => v.height + v.width).file_id)
    if (buffer instanceof Error) return buffer

    return buffer
  }

  async userLastProfilePhoto(id: number): Promise<Buffer | Error> {
    let photos: UserProfilePhotos | Error, sizes: PhotoSize[][], buffer: Buffer | Error

    photos = await this.telegram.get.userProfilePhotos(id)
    if (photos instanceof Error) return photos

    sizes = photos.photos
    if (sizes.length <= 0) return new Error(JSON.stringify(photos))

    buffer = await this.file(maxBy(last(sizes), (v: PhotoSize) => v.height + v.width).file_id)
    if (buffer instanceof Error) return buffer

    return buffer
  }
}

export default Download
