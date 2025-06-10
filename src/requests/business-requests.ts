import { type FetchError } from '@aracna/core'
import type {
  BusinessConnection,
  DeleteBusinessMessages,
  GetBusinessAccountGifts,
  GetBusinessAccountStarBalance,
  GetBusinessConnection,
  OwnedGifts,
  ReadBusinessMessage,
  RemoveBusinessAccountProfilePhoto,
  SetBusinessAccountBio,
  SetBusinessAccountGiftSettings,
  SetBusinessAccountName,
  SetBusinessAccountProfilePhoto,
  SetBusinessAccountUsername,
  TransferBusinessAccountStars
} from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function deleteBusinessMessages(body: DeleteBusinessMessages, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteBusinessMessages>('deleteBusinessMessages', body, config)
}

export async function getBusinessAccountGifts(body: GetBusinessAccountGifts, config?: TelegramApiConfig): Promise<OwnedGifts | FetchError> {
  return TelegramAPI.post<OwnedGifts, GetBusinessAccountGifts>('getBusinessAccountGifts', body, config)
}

export async function getBusinessAccountStarBalance(body: GetBusinessAccountStarBalance, config?: TelegramApiConfig): Promise<number | FetchError> {
  return TelegramAPI.post<number, GetBusinessAccountStarBalance>('getBusinessAccountStarBalance', body, config)
}

export async function getBusinessConnection(body: GetBusinessConnection, config?: TelegramApiConfig): Promise<BusinessConnection | FetchError> {
  return TelegramAPI.post<BusinessConnection, GetBusinessConnection>('getBusinessConnection', body, config)
}

export async function readBusinessMessage(body: ReadBusinessMessage, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, ReadBusinessMessage>('readBusinessMessage', body, config)
}

export async function removeBusinessAccountProfilePhoto(body: RemoveBusinessAccountProfilePhoto, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, RemoveBusinessAccountProfilePhoto>('removeBusinessAccountProfilePhoto', body, config)
}

export async function setBusinessAccountBio(body: SetBusinessAccountBio, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetBusinessAccountBio>('setBusinessAccountBio', body, config)
}

export async function setBusinessAccountGiftSettings(body: SetBusinessAccountGiftSettings, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetBusinessAccountGiftSettings>('setBusinessAccountGiftSettings', body, config)
}

export async function setBusinessAccountName(body: SetBusinessAccountName, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetBusinessAccountName>('setBusinessAccountName', body, config)
}

export async function setBusinessAccountProfilePhoto(body: SetBusinessAccountProfilePhoto, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetBusinessAccountProfilePhoto>(
    'setBusinessAccountProfilePhoto',
    {
      ...body,
      photo:
        'animation' in body.photo && body.photo.animation instanceof Blob
          ? { ...body.photo, animation: 'attach://photo_blob' }
          : 'photo' in body.photo && body.photo.photo instanceof Blob
          ? { ...body.photo, photo: 'attach://photo_blob' }
          : body.photo,
      ...('animation' in body.photo && body.photo.animation instanceof Blob
        ? { photo_blob: body.photo.animation }
        : 'photo' in body.photo && body.photo.photo instanceof Blob
        ? { photo_blob: body.photo.photo }
        : {})
    },
    config
  )
}

export async function setBusinessAccountUsername(body: SetBusinessAccountUsername, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetBusinessAccountUsername>('setBusinessAccountUsername', body, config)
}

export async function transferBusinessAccountStars(body: TransferBusinessAccountStars, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, TransferBusinessAccountStars>('transferBusinessAccountStars', body, config)
}
