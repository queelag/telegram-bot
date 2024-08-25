import type { FetchError, FetchResponse } from '@aracna/core'
import type { File, PhotoSize, UserProfilePhotos } from '@aracna/telegram-bot-types'
import { TelegramFileAPI } from '../apis/telegram-file-api'
import { getFile, getUserProfilePhotos } from './get-requests'

export async function downloadFile(token: string, fileID: string): Promise<Buffer | FetchError> {
  let file: File | FetchError, buffer: FetchResponse<Buffer> | FetchError

  file = await getFile(token, { file_id: fileID })
  if (file instanceof Error) return file

  buffer = await TelegramFileAPI.get(file.file_path ?? '')
  if (buffer instanceof Error) return buffer

  return buffer.data
}

export async function downloadUserFirstProfilePhoto(token: string, userID: bigint): Promise<Buffer | FetchError | Error> {
  let photos: UserProfilePhotos | FetchError, sizes: PhotoSize[][], buffer: Buffer | Error

  photos = await getUserProfilePhotos(token, { limit: 1, user_id: userID })
  if (photos instanceof Error) return photos

  sizes = photos.photos
  if (sizes.length <= 0) return new Error(JSON.stringify(photos))

  buffer = await downloadFile(token, sizes[0].reduce((r: PhotoSize, v: PhotoSize) => (v.height + v.width > r.height + r.width ? v : r), sizes[0][0]).file_id)
  if (buffer instanceof Error) return buffer

  return buffer
}
