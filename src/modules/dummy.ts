import { HandlerType } from '../definitions/enums'
import { ConfigurationDefault, ConfigurationHandler, Handler } from '../definitions/types'

class Dummy {
  static get handler(): Handler {
    return { id: '', command: '', middleware: () => null, type: HandlerType.TEXT, options: { deleteOnCallback: true, description: '' } }
  }

  static get configurationDefault(): ConfigurationDefault {
    return {
      buttons: {
        text: async () => [],
        url: async () => [],
        login: async () => [],
        callback: async () => [],
        query: async () => [],
        queryCurrentChat: async () => [],
        game: async () => [],
        pay: async () => []
      }
    }
  }

  static get configurationHandler(): ConfigurationHandler {
    return { send: { buttons: { empty: () => new Error() } } }
  }
}

export default Dummy
