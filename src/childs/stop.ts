import { FetchError } from '@queelag/core'
import { Message, Poll, StopMessageLiveLocation, StopPoll } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Stop extends Child {
  async messageLiveLocation(parameters: StopMessageLiveLocation): Promise<Message | boolean | FetchError> {
    return this.telegram.api.post<Message | boolean, StopMessageLiveLocation>('stopMessageLiveLocation', parameters)
  }

  async poll(chat: number, message: number, parameters?: Partial<StopPoll>): Promise<Poll | FetchError> {
    return this.telegram.api.post<Poll, StopPoll>('stopPoll', { chat_id: chat, message_id: message, ...parameters })
  }
}
