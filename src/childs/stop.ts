import Child from '../modules/child'
import { StopMessageLiveLocation, Message, StopPoll, Poll } from '@queelag/telegram-types'

class Stop extends Child {
  messageLiveLocation(parameters: StopMessageLiveLocation): Promise<(Message | boolean) | Error> {
    return this.telegram.api.post<StopMessageLiveLocation, Message | boolean>('stopMessageLiveLocation', parameters)
  }

  poll(chat: number, message: number, parameters?: StopPoll): Promise<Poll | Error> {
    return this.telegram.api.post<StopPoll, Poll>('stopPoll', { chat_id: chat, message_id: message, ...parameters })
  }
}

export default Stop
