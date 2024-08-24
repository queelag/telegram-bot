import type { FetchError } from '@aracna/core'
import type { BanChatMember, BanChatSenderChat } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function banChatMember(token: string, body: BanChatMember): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, BanChatMember>('banChatMember', body, { token })
}

export async function banChatSenderChat(token: string, body: BanChatSenderChat): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, BanChatSenderChat>('banChatSenderChat', body, { token })
}
