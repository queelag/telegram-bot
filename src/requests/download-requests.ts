import type { FetchError } from '@aracna/core'
import type { File, PhotoSize, UserProfilePhotos } from '@aracna/telegram-bot-types'
import { TelegramFileAPI } from '../apis/telegram-file-api'
import type { TelegramApiConfig, TelegramFileApiConfig } from '../definitions/interfaces'
import { getFile, getUserProfilePhotos } from './get-requests'

export async function downloadFile(fileID: string, config?: TelegramApiConfig & TelegramFileApiConfig): Promise<Blob | FetchError> {
  let file: File | FetchError, blob: Blob | FetchError

  file = await getFile({ file_id: fileID }, config)
  if (file instanceof Error) return file

  blob = await TelegramFileAPI.get(file.file_path ?? '', config)
  if (blob instanceof Error) return blob

  return blob
}

export async function downloadUserFirstProfilePhoto(
  userID: bigint | number,
  config?: TelegramApiConfig & TelegramFileApiConfig
): Promise<Blob | FetchError | Error> {
  let photos: UserProfilePhotos | FetchError, sizes: PhotoSize[][], blob: Blob | Error

  photos = await getUserProfilePhotos({ limit: 1, user_id: userID }, config)
  if (photos instanceof Error) return photos

  sizes = photos.photos
  if (sizes.length <= 0) return new Error(JSON.stringify(photos))

  blob = await downloadFile(sizes[0].reduce((r: PhotoSize, v: PhotoSize) => (v.height + v.width > r.height + r.width ? v : r), sizes[0][0]).file_id, config)
  if (blob instanceof Error) return blob

  return blob
}
