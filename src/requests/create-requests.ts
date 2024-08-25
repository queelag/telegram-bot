import type { FetchError } from '@aracna/core'
import type {
  ChatInviteLink,
  CreateChatInviteLink,
  CreateChatSubscriptionInviteLink,
  CreateForumTopic,
  CreateInvoiceLink,
  CreateNewStickerSet
} from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function createChatInviteLink(token: string, body: CreateChatInviteLink): Promise<ChatInviteLink | FetchError> {
  return TelegramAPI.post<ChatInviteLink, CreateChatInviteLink>('createChatInviteLink', body, { token })
}

export async function createChatSubscriptionInviteLink(token: string, body: CreateChatSubscriptionInviteLink): Promise<ChatInviteLink | FetchError> {
  return TelegramAPI.post<ChatInviteLink, CreateChatSubscriptionInviteLink>('createChatSubscriptionInviteLink', body, { token })
}

export async function createForumTopic(token: string, body: CreateForumTopic) {
  return TelegramAPI.post<boolean, CreateForumTopic>('createForumTopic', body, { token })
}

export async function createInvoiceLink(token: string, body: CreateInvoiceLink): Promise<string | FetchError> {
  return TelegramAPI.post<string, CreateInvoiceLink>('createInvoiceLink', body, { token })
}

export async function createNewStickerSet(token: string, body: CreateNewStickerSet): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, CreateNewStickerSet>('createNewStickerSet', body, { token })
}
