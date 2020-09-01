import { LeaveChat } from '@queelag/telegram-types'
import Child from '../modules/child'

class Leave extends Child {
  async chat(id: number): Promise<boolean | Error> {
    return this.telegram.api.post<LeaveChat, boolean>('leaveChat', { chat_id: id })
  }
}

export default Leave
