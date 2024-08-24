import type { FetchError } from '@aracna/core'
import type { DeleteWebhook, SetWebhook, WebhookInfo } from '@aracna/telegram-bot-types'
import { UpdateType } from '../definitions/enums'
import { Child } from '../modules/child'

export class Webhook extends Child {
  async close(): Promise<boolean | FetchError> {
    return this.telegram.api.post('close')
  }

  async delete(parameters?: Partial<DeleteWebhook>): Promise<boolean | FetchError> {
    return this.telegram.api.post('deleteWebhook', parameters)
  }

  async getInfo(): Promise<WebhookInfo | FetchError> {
    return this.telegram.api.post('getWebhookInfo')
  }

  async set(route: string = '', parameters?: Partial<SetWebhook>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetWebhook>('setWebhook', {
      allowed_updates: Object.values(UpdateType).map((v: UpdateType) => v.toLowerCase()),
      max_connections: 100,
      url: this.url(route),
      ...parameters
    })
  }

  url(route: string): string {
    return 'https://' + this.telegram.hostname + ':' + this.telegram.port + '/' + route + 'bot' + this.telegram.token
  }
}
