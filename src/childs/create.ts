import type { FetchError } from '@aracna/core'
import type {
  ChatInviteLink,
  CreateChatInviteLink,
  CreateChatSubscriptionInviteLink,
  CreateForumTopic,
  CreateInvoiceLink,
  CreateNewStickerSet,
  InputSticker,
  LabeledPrice
} from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Create extends Child {
  async chatInviteLink(chatID: bigint, parameters?: Partial<CreateChatInviteLink>): Promise<ChatInviteLink | FetchError> {
    return this.telegram.api.post<ChatInviteLink, CreateChatInviteLink>('createChatInviteLink', { chat_id: chatID, ...parameters })
  }

  async chatSubscriptionInviteLink(chatID: bigint, parameters: Omit<CreateChatSubscriptionInviteLink, 'chat_id'>): Promise<ChatInviteLink | FetchError> {
    return this.telegram.api.post<ChatInviteLink, CreateChatSubscriptionInviteLink>('createChatSubscriptionInviteLink', { chat_id: chatID, ...parameters })
  }

  async forumTopic(chatID: bigint, name: string, parameters?: Partial<CreateForumTopic>) {
    return this.telegram.api.post<boolean, CreateForumTopic>('createForumTopic', { chat_id: chatID, name: name, ...parameters })
  }

  async invoiceLink(prices: LabeledPrice[], parameters: Omit<CreateInvoiceLink, 'prices'>): Promise<string | FetchError> {
    return this.telegram.api.post<string, CreateInvoiceLink>('createInvoiceLink', { prices: prices, ...parameters })
  }

  async stickerSet(userID: bigint, stickers: InputSticker[], parameters: Omit<CreateNewStickerSet, 'stickers' | 'user_id'>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, CreateNewStickerSet>('createNewStickerSet', {
      stickers: stickers,
      user_id: userID,
      ...parameters
    })
  }
}
