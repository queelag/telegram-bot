import type { FetchError } from '@aracna/core'
import type { ForwardMessage, ForwardMessages, Message, MessageId } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function forwardMessage(body: ForwardMessage, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, ForwardMessage>('forwardMessage', body, config)
}

export async function forwardMessages(body: ForwardMessages, config?: TelegramApiConfig): Promise<MessageId[] | FetchError> {
  return TelegramAPI.post<MessageId[], ForwardMessages>('forwardMessages', body, config)
}
