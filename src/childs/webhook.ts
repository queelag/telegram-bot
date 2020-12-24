import { SetWebhook } from '@queelag/telegram-types'
import Child from '../modules/child'

class Webhook extends Child {
  async set(route: string = '', parameters?: Partial<SetWebhook>): Promise<boolean | Error> {
    return this.telegram.api.post<SetWebhook, boolean>('setWebhook', {
      url: this.url(route),
      max_connections: 50,
      allowed_updates: ['message', 'callback_query'],
      ...parameters
    })
  }

  async delete(): Promise<boolean | Error> {
    return this.telegram.api.post<null, boolean>('deleteWebhook')
  }

  url(route: string): string {
    return 'https://' + this.telegram.hostname + ':' + this.telegram.port + '/' + route + 'bot' + this.telegram.token
  }
}

export default Webhook
