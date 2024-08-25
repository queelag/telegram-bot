import type { FetchError } from '@aracna/core'
import type { File, PhotoSize, UserProfilePhotos } from '@aracna/telegram-bot-types'
import { TelegramFileAPI } from '../apis/telegram-file-api'
import { getFile, getUserProfilePhotos } from './get-requests'

export async function downloadFile(token: string, fileID: string): Promise<Blob | FetchError> {
  let file: File | FetchError, blob: Blob | FetchError

  file = await getFile(token, { file_id: fileID })
  if (file instanceof Error) return file

  blob = await TelegramFileAPI.get(file.file_path ?? '', { token })
  if (blob instanceof Error) return blob

  return blob
}

export async function downloadUserFirstProfilePhoto(token: string, userID: bigint | number): Promise<Blob | FetchError | Error> {
  let photos: UserProfilePhotos | FetchError, sizes: PhotoSize[][], blob: Blob | Error

  photos = await getUserProfilePhotos(token, { limit: 1, user_id: userID })
  if (photos instanceof Error) return photos

  sizes = photos.photos
  if (sizes.length <= 0) return new Error(JSON.stringify(photos))

  blob = await downloadFile(token, sizes[0].reduce((r: PhotoSize, v: PhotoSize) => (v.height + v.width > r.height + r.width ? v : r), sizes[0][0]).file_id)
  if (blob instanceof Error) return blob

  return blob
}
