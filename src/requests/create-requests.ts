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
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function createChatInviteLink(body: CreateChatInviteLink, config?: TelegramApiConfig): Promise<ChatInviteLink | FetchError> {
  return TelegramAPI.post<ChatInviteLink, CreateChatInviteLink>('createChatInviteLink', body, config)
}

export async function createChatSubscriptionInviteLink(
  body: CreateChatSubscriptionInviteLink,
  config?: TelegramApiConfig
): Promise<ChatInviteLink | FetchError> {
  return TelegramAPI.post<ChatInviteLink, CreateChatSubscriptionInviteLink>('createChatSubscriptionInviteLink', body, config)
}

export async function createForumTopic(body: CreateForumTopic, config?: TelegramApiConfig): Promise<ForumTopic | FetchError> {
  return TelegramAPI.post<ForumTopic, CreateForumTopic>('createForumTopic', body, config)
}

export async function createInvoiceLink(body: CreateInvoiceLink, config?: TelegramApiConfig): Promise<string | FetchError> {
  return TelegramAPI.post<string, CreateInvoiceLink>('createInvoiceLink', body, config)
}

export async function createNewStickerSet(body: CreateNewStickerSet, config?: TelegramApiConfig): Promise<boolean | FetchError> {
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
    config
  )
}
