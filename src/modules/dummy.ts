import { HandlerType } from '../definitions/enums'
import { ConfigurationDefault, Handler } from '../definitions/types'

class Dummy {
  static get handler(): Handler {
    return { id: '', command: '', middleware: () => null, type: HandlerType.TEXT, options: { deleteOnCallback: true, description: '' } }
  }

  static get configurationDefault(): ConfigurationDefault {
    return { buttons: { text: [], url: [], login: [], callback: [], query: [], queryCurrentChat: [], game: [], pay: [] } }
  }
}

export default Dummy
