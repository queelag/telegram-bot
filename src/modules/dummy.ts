import { UpdateType } from '../definitions/enums'
import { ConfigurationAPI, ConfigurationDefault, ConfigurationHandler, Handler } from '../definitions/interfaces'

export class Dummy {
  static get handler(): Handler<any, any> {
    return {
      id: '',
      key: '',
      middleware: () => null,
      options: { deleteOnCallbackQuery: true, deleteOnReply: true, description: '' },
      type: UpdateType.MESSAGE
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
}
