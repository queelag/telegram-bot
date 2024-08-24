import type { FetchError } from '@aracna/core'
import type { Message, Poll, StopMessageLiveLocation, StopPoll } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function stopMessageLiveLocation(token: string, body: StopMessageLiveLocation): Promise<Message | boolean | FetchError> {
  return TelegramAPI.post<Message | boolean, StopMessageLiveLocation>('stopMessageLiveLocation', body, { token })
}

export async function stopPoll(token: string, body: StopPoll): Promise<Poll | FetchError> {
  return TelegramAPI.post<Poll, StopPoll>('stopPoll', body, { token })
}
