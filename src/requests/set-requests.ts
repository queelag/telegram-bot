import type { FetchError } from '@aracna/core'
import type {
  SetChatAdministratorCustomTitle,
  SetChatDescription,
  SetChatMenuButton,
  SetChatPermissions,
  SetChatPhoto,
  SetChatStickerSet,
  SetChatTitle,
  SetCustomEmojiStickerSetThumbnail,
  SetGameScore,
  SetMessageReaction,
  SetMyCommands,
  SetMyDefaultAdministratorRights,
  SetMyDescription,
  SetMyName,
  SetMyShortDescription,
  SetPassportDataErrors,
  SetStickerEmojiList,
  SetStickerKeywords,
  SetStickerMaskPosition,
  SetStickerPositionInSet,
  SetStickerSetThumbnail,
  SetStickerSetTitle
} from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function setChatAdministratorCustomTitle(body: SetChatAdministratorCustomTitle, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatAdministratorCustomTitle>('setChatAdministratorCustomTitle', body, config)
}

export async function setChatDescription(body: SetChatDescription, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatDescription>('setChatDescription', body, config)
}

export async function setChatMenuButton(body: SetChatMenuButton, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatMenuButton>('setChatMenuButton', body, config)
}

export async function setChatPermissions(body: SetChatPermissions, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatPermissions>('setChatPermissions', body, config)
}

export async function setChatPhoto(body: SetChatPhoto, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatPhoto>(
    'setChatPhoto',
    {
      ...body,
      photo: body.photo instanceof Blob ? `attach://photo_blob` : body.photo,
      ...(body.photo instanceof Blob ? { photo_blob: body.photo } : {})
    },
    config
  )
}

export async function setChatStickerSet(body: SetChatStickerSet, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatStickerSet>('setChatStickerSet', body, config)
}

export async function setChatTitle(body: SetChatTitle, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatTitle>('setChatTitle', body, config)
}

export async function setCustomEmojiStickerSetThumbnail(body: SetCustomEmojiStickerSetThumbnail, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetCustomEmojiStickerSetThumbnail>('setCustomEmojiStickerSetThumbnail', body, config)
}

export async function setGameScore(body: SetGameScore, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetGameScore>('setGameScore', body, config)
}

export async function setMessageReaction(body: SetMessageReaction, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetMessageReaction>('setMessageReaction', body, config)
}

export async function setMyCommands(body: SetMyCommands, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetMyCommands>('setMyCommands', body, config)
}

export async function setMyDefaultAdministratorRights(body: SetMyDefaultAdministratorRights, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetMyDefaultAdministratorRights>('setMyDefaultAdministratorRights', body, config)
}

export async function setMyDescription(body: SetMyDescription, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetMyDescription>('setMyDescription', body, config)
}

export async function setMyName(body: SetMyName, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetMyName>('setMyName', body, config)
}

export async function setMyShortDescription(body: SetMyShortDescription, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetMyShortDescription>('setMyShortDescription', body, config)
}

export async function setPassportDataErrors(body: SetPassportDataErrors, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetPassportDataErrors>('setPassportDataErrors', body, config)
}

export async function setStickerEmojiList(body: SetStickerEmojiList, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetStickerEmojiList>('setStickerEmojiList', body, config)
}

export async function setStickerKeywords(body: SetStickerKeywords, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetStickerKeywords>('setStickerKeywords', body, config)
}

export async function setStickerMaskPosition(body: SetStickerMaskPosition, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetStickerMaskPosition>('setStickerMaskPosition', body, config)
}

export async function setStickerPositionInSet(body: SetStickerPositionInSet, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetStickerPositionInSet>('setStickerPositionInSet', body, config)
}

export async function setStickerSetThumbnail(body: SetStickerSetThumbnail, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetStickerSetThumbnail>('setStickerSetThumbnail', body, config)
}

export async function setStickerSetTitle(body: SetStickerSetTitle, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetStickerSetTitle>('setStickerSetTitle', body, config)
}
