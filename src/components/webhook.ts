import Telegram from '..'
import Component from '../modules/component'

class Webhook extends Component {
  async set(): Promise<boolean | Error> {
    return this.telegram.api.post('setWebhook', {
      url: this.telegram.url,
      token: this.telegram.token,
      max_connections: 50,
      allowed_updates: ['message', 'callback_query']
    })
  }

  async delete(): Promise<boolean | Error> {
    return false
  }
}

export default Webhook
