import { ConfigurationDefault } from '../definitions/types'
import Dummy from '../modules/dummy'

class TelegramConfiguration {
  default: ConfigurationDefault = Dummy.configurationDefault
}

const telegramConfiguration = new TelegramConfiguration()
export default telegramConfiguration
