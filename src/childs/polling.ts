import { GetUpdates, Update } from '@queelag/telegram-types'
import { last } from 'lodash'
import Child from '../modules/child'

class Polling extends Child {
  private offset: number = 0
  private polling: boolean = false

  start(): void {
    this.polling = true
    this.get()
  }

  stop(): void {
    this.polling = false
  }

  private async get(ms: number = 1000): Promise<void> {
    let body: any, updates: Update[] | Error

    body = {
      offset: this.offset,
      allowed_updates: ['message', 'callback_query']
    }

    updates = await this.telegram.api.post<GetUpdates, Update[]>('getUpdates', body)
    if (updates instanceof Error) return

    updates.forEach((v: Update) => this.telegram.handle(v))
    this.offset = updates.length > 0 ? last(updates).update_id + 1 : this.offset

    if (this.polling) setTimeout(() => this.get(), ms)
  }
}

export default Polling
