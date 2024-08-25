import type { FetchError } from '@aracna/core'
import type {
  ChatInviteLink,
  CreateChatInviteLink,
  CreateChatSubscriptionInviteLink,
  CreateForumTopic,
  CreateInvoiceLink,
  CreateNewStickerSet,
  ForumTopic,
  InputSticker
} from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function createChatInviteLink(token: string, body: CreateChatInviteLink): Promise<ChatInviteLink | FetchError> {
  return TelegramAPI.post<ChatInviteLink, CreateChatInviteLink>('createChatInviteLink', body, { token })
}

export async function createChatSubscriptionInviteLink(token: string, body: CreateChatSubscriptionInviteLink): Promise<ChatInviteLink | FetchError> {
  return TelegramAPI.post<ChatInviteLink, CreateChatSubscriptionInviteLink>('createChatSubscriptionInviteLink', body, { token })
}

export async function createForumTopic(token: string, body: CreateForumTopic): Promise<ForumTopic | FetchError> {
  return TelegramAPI.post<ForumTopic, CreateForumTopic>('createForumTopic', body, { token })
}

export async function createInvoiceLink(token: string, body: CreateInvoiceLink): Promise<string | FetchError> {
  return TelegramAPI.post<string, CreateInvoiceLink>('createInvoiceLink', body, { token })
}

export async function createNewStickerSet(token: string, body: CreateNewStickerSet): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, CreateNewStickerSet>(
    'createNewStickerSet',
    {
      ...body,
      stickers: body.stickers.map((sticker: InputSticker, index: number) => ({
        ...sticker,
        sticker: sticker.sticker instanceof Blob ? `attach://sticker_${index}` : sticker.sticker
      })),
      ...body.stickers.reduce((result: object, sticker: InputSticker, index: number) => ({ ...result, [`sticker_${index}`]: sticker.sticker }), {})
    },
    { token }
  )
}
