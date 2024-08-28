import type { FetchError } from '@aracna/core'
import type { UnpinAllChatMessages, UnpinAllForumTopicMessages, UnpinAllGeneralForumTopicMessages, UnpinChatMessage } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function unpinAllChatMessages(body: UnpinAllChatMessages, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, UnpinAllChatMessages>('unpinAllChatMessages', body, config)
}

export async function unpinAllForumTopicMessages(body: UnpinAllForumTopicMessages, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, UnpinAllForumTopicMessages>('unpinAllForumTopicMessages', body, config)
}

export async function unpinAllGeneralForumTopicMessages(body: UnpinAllGeneralForumTopicMessages, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, UnpinAllGeneralForumTopicMessages>('unpinAllGeneralForumTopicMessages', body, config)
}

export async function unpinChatMessage(body: UnpinChatMessage, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, UnpinChatMessage>('unpinChatMessage', body, config)
}
