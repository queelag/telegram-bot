import type { FetchError } from '@aracna/core'
import type { UnbanChatMember, UnbanChatSenderChat } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function unbanChatMember(body: UnbanChatMember, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, UnbanChatMember>('unbanChatMember', body, config)
}

export async function unbanChatSenderChat(body: UnbanChatSenderChat, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, UnbanChatSenderChat>('unbanChatSenderChat', body, config)
}
