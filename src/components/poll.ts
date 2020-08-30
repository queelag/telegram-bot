import Component from '../modules/component'
import { Update } from 'telegram-typings'
import { last } from 'lodash'

class Poll extends Component {
  private offset: number = 0
  private polling: boolean = false

  start(): void {
    this.polling = true
    this.get()
  }

  stop(): void {
    this.polling = false
  }

  private async get(): Promise<void> {
    let body: any, updates: Error | { result: Update[] }

    body = {
      offset: this.offset,
      allowed_updates: ['message', 'callback_query']
    }

    updates = await this.telegram.api.post<any, { result: Update[] }>('getUpdates', body)
    if (updates instanceof Error) return

    updates.result.forEach((v: Update) => this.telegram.handle(v))
    this.offset = updates.result.length > 0 ? last(updates.result).update_id + 1 : this.offset

    this.polling && setTimeout(() => this.get(), 1000)
  }
}

export default Poll
