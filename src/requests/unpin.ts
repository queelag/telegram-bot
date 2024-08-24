import type { FetchError } from '@aracna/core'
import type { UnpinAllChatMessages, UnpinAllForumTopicMessages, UnpinAllGeneralForumTopicMessages, UnpinChatMessage } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function unpinAllChatMessages(token: string, body: UnpinAllChatMessages): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, UnpinAllChatMessages>('unpinAllChatMessages', body, { token })
}

export async function unpinAllForumTopicMessages(token: string, body: UnpinAllForumTopicMessages): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, UnpinAllForumTopicMessages>('unpinAllForumTopicMessages', body, { token })
}

export async function unpinAllGeneralForumTopicMessages(token: string, body: UnpinAllGeneralForumTopicMessages): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, UnpinAllGeneralForumTopicMessages>('unpinAllGeneralForumTopicMessages', body, { token })
}

export async function unpinChatMessage(token: string, body: UnpinChatMessage): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, UnpinChatMessage>('unpinChatMessage', body, { token })
}
