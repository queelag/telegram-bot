import { FetchError } from '@queelag/core'
import { SetWebhook } from '@queelag/telegram-types'
import { UpdateType } from '../definitions/enums'
import { Child } from '../modules/child'

export class Webhook extends Child {
  async set(route: string = '', parameters?: Partial<SetWebhook>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetWebhook>('setWebhook', {
      allowed_updates: Object.values(UpdateType).map((v: UpdateType) => v.toLowerCase()),
      max_connections: 100,
      url: this.url(route),
      ...parameters
    })
  }

  async delete(): Promise<boolean | FetchError> {
    return this.telegram.api.post('deleteWebhook')
  }

  url(route: string): string {
    return 'https://' + this.telegram.hostname + ':' + this.telegram.port + '/' + route + 'bot' + this.telegram.token
  }
}
