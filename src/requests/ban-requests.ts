import type { FetchError } from '@aracna/core'
import type { BanChatMember, BanChatSenderChat } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function banChatMember(body: BanChatMember, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, BanChatMember>('banChatMember', body, config)
}

export async function banChatSenderChat(body: BanChatSenderChat, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, BanChatSenderChat>('banChatSenderChat', body, config)
}
