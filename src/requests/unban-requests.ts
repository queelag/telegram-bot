import type { FetchError } from '@aracna/core'
import type { UnbanChatMember, UnbanChatSenderChat } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function unbanChatMember(token: string, body: UnbanChatMember): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, UnbanChatMember>('unbanChatMember', body, { token })
}

export async function chatSenderChat(token: string, body: UnbanChatSenderChat): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, UnbanChatSenderChat>('unbanChatSenderChat', body, { token })
}
