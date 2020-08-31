import Telegram from '..'
import Child from '../modules/child'
import { SetWebhook } from '@queelag/telegram-types'

class Webhook extends Child {
  async set(): Promise<boolean | Error> {
    return this.telegram.api.post<SetWebhook, boolean>('setWebhook', {
      url: this.url,
      max_connections: 50,
      allowed_updates: ['message', 'callback_query']
    })
  }

  async delete(): Promise<boolean | Error> {
    return this.telegram.api.post<null, boolean>('deleteWebhook')
  }

  get url(): string {
    return 'https://' + this.telegram.hostname + ':' + process.env.PORT + '/bot' + this.telegram.token
  }
}

export default Webhook
