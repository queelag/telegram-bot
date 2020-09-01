import { HandlerType } from '../definitions/enums'
import { Handler } from '../definitions/types'

class Dummy {
  static get handler(): Handler {
    return { id: '', command: '', middleware: () => null, type: HandlerType.TEXT, options: { deleteOnCallback: true, description: '' } }
  }
}

export default Dummy
