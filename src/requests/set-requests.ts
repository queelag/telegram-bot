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

export async function setChatAdministratorCustomTitle(token: string, body: SetChatAdministratorCustomTitle): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatAdministratorCustomTitle>('setChatAdministratorCustomTitle', body, { token })
}

export async function setChatDescription(token: string, body: SetChatDescription): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatDescription>('setChatDescription', body, { token })
}

export async function setChatMenuButton(token: string, body: SetChatMenuButton): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatMenuButton>('setChatMenuButton', body, { token })
}

export async function setChatPermissions(token: string, body: SetChatPermissions): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatPermissions>('setChatPermissions', body, { token })
}

export async function setChatPhoto(token: string, body: SetChatPhoto): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatPhoto>(
    'setChatPhoto',
    {
      ...body,
      photo: body.photo instanceof Blob ? `attach://photo_blob` : body.photo,
      ...(body.photo instanceof Blob ? { photo_blob: body.photo } : {})
    },
    { token }
  )
}

export async function setChatStickerSet(token: string, body: SetChatStickerSet): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatStickerSet>('setChatStickerSet', body, { token })
}

export async function setChatTitle(token: string, body: SetChatTitle): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetChatTitle>('setChatTitle', body, { token })
}

export async function setCustomEmojiStickerSetThumbnail(token: string, body: SetCustomEmojiStickerSetThumbnail): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetCustomEmojiStickerSetThumbnail>('setCustomEmojiStickerSetThumbnail', body, { token })
}

export async function setGameScore(token: string, body: SetGameScore): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetGameScore>('setGameScore', body, { token })
}

export async function setMessageReaction(token: string, body: SetMessageReaction): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetMessageReaction>('setMessageReaction', body, { token })
}

export async function setMyCommands(token: string, body: SetMyCommands): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetMyCommands>('setMyCommands', body, { token })
}

export async function setMyDefaultAdministratorRights(token: string, body: SetMyDefaultAdministratorRights): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetMyDefaultAdministratorRights>('setMyDefaultAdministratorRights', body, { token })
}

export async function setMyDescription(token: string, body: SetMyDescription): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetMyDescription>('setMyDescription', body, { token })
}

export async function setMyName(token: string, body: SetMyName): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetMyName>('setMyName', body, { token })
}

export async function setMyShortDescription(token: string, body: SetMyShortDescription): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetMyShortDescription>('setMyShortDescription', body, { token })
}

export async function setPassportDataErrors(token: string, body: SetPassportDataErrors): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetPassportDataErrors>('setPassportDataErrors', body, { token })
}

export async function setStickerEmojiList(token: string, body: SetStickerEmojiList): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetStickerEmojiList>('setStickerEmojiList', body, { token })
}

export async function setStickerKeywords(token: string, body: SetStickerKeywords): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetStickerKeywords>('setStickerKeywords', body, { token })
}

export async function setStickerMaskPosition(token: string, body: SetStickerMaskPosition): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetStickerMaskPosition>('setStickerMaskPosition', body, { token })
}

export async function setStickerPositionInSet(token: string, body: SetStickerPositionInSet): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetStickerPositionInSet>('setStickerPositionInSet', body, { token })
}

export async function setStickerSetThumbnail(token: string, body: SetStickerSetThumbnail): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetStickerSetThumbnail>('setStickerSetThumbnail', body, { token })
}

export async function setStickerSetTitle(token: string, body: SetStickerSetTitle): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetStickerSetTitle>('setStickerSetTitle', body, { token })
}
