import type { FetchError } from '@aracna/core'
import type { Message, Poll, StopMessageLiveLocation, StopPoll } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function stopMessageLiveLocation(body: StopMessageLiveLocation, config?: TelegramApiConfig): Promise<Message | boolean | FetchError> {
  return TelegramAPI.post<Message | boolean, StopMessageLiveLocation>('stopMessageLiveLocation', body, config)
}

export async function stopPoll(body: StopPoll, config?: TelegramApiConfig): Promise<Poll | FetchError> {
  return TelegramAPI.post<Poll, StopPoll>('stopPoll', body, config)
}
