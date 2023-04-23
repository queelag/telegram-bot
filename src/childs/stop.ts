import { FetchError } from '@aracna/core'
import { Message, Poll, StopMessageLiveLocation, StopPoll } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Stop extends Child {
  async messageLiveLocation(parameters: StopMessageLiveLocation): Promise<Message | boolean | FetchError> {
    return this.telegram.api.post<Message | boolean, StopMessageLiveLocation>('stopMessageLiveLocation', parameters)
  }

  async poll(chatID: number, message: number, parameters?: Partial<StopPoll>): Promise<Poll | FetchError> {
    return this.telegram.api.post<Poll, StopPoll>('stopPoll', { chat_id: chatID, message_id: message, ...parameters })
  }
}
