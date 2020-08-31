import Child from '../modules/child'
import { LeaveChat } from '@queelag/telegram-types'

class Leave extends Child {
  chat(id: number): Promise<boolean | Error> {
    return this.telegram.api.post<LeaveChat, boolean>('leaveChat', { chat_id: id })
  }
}

export default Leave
