import { UpdateType } from '../definitions/enums'
import type { CallbackQueryBody, ConfigurationAPI, ConfigurationDefault, ConfigurationHandler, Handler, MessageBody } from '../definitions/interfaces'

export class Dummy {
  static get callbackQueryBody(): CallbackQueryBody {
    return {
      c: undefined,
      d: 0,
      t: ''
    }
  }

  static get configurationAPI(): ConfigurationAPI {
    return {
      post: {
        callback: {
          success: () => null
        }
      }
    }
  }

  static get configurationDefault(): ConfigurationDefault {
    return {
      buttons: {
        callback: async () => [],
        game: async () => [],
        login: async () => [],
        pay: async () => [],
        query: async () => [],
        queryCurrentChat: async () => [],
        text: async () => [],
        url: async () => []
      }
    }
  }

  static get configurationHandler(): ConfigurationHandler {
    return { send: { buttons: { empty: () => new Error() } } }
  }
  static get handler(): Handler<any, any> {
    return {
      id: '',
      key: '',
      middleware: () => null,
      options: {
        deleteOnCallbackQuery: true,
        deleteOnMessageStart: true,
        deleteOnReply: true
      },
      type: UpdateType.MESSAGE
    }
  }

  static get messageBody(): MessageBody {
    return { chatID: undefined, data: undefined, type: '' }
  }
}
