import { FetchError } from '@aracna/core'
import { GetUpdates, Update } from '@aracna/telegram-bot-types'
import { UpdateType } from '../definitions/enums'
import { Child } from '../modules/child'

export class Polling extends Child {
  active: boolean = false
  offset: number = 0

  start(ms: number = 1000, parameters: Partial<GetUpdates>): void {
    this.active = true
    this.get(ms, parameters)
  }

  stop(): void {
    this.active = false
  }

  private async get(ms: number, parameters: Partial<GetUpdates>): Promise<Update[] | FetchError> {
    let body: GetUpdates, updates: Update[] | FetchError

    body = {
      allowed_updates: Object.values(UpdateType).map((v: UpdateType) => v.toLowerCase()),
      offset: this.offset,
      ...parameters
    }

    updates = await this.telegram.api.post('getUpdates', body)
    if (updates instanceof Error) return updates

    updates.forEach((v: Update) => this.telegram.handle(v))
    this.offset = updates.length > 0 ? updates[updates.length - 1].update_id + 1 : this.offset

    if (this.active) {
      setTimeout(() => this.get(ms, parameters), ms)
    }

    return updates
  }
}
