import type { FetchError } from '@aracna/core'
import type { ForwardMessage, ForwardMessages, Message, MessageId } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function forwardMessage(token: string, body: ForwardMessage): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, ForwardMessage>('forwardMessage', body, { token })
}

export async function forwardMessages(token: string, body: ForwardMessages): Promise<MessageId[] | FetchError> {
  return TelegramAPI.post<MessageId[], ForwardMessages>('forwardMessages', body, { token })
}
