import { ConfigurationAPI, ConfigurationDefault, ConfigurationHandler } from '../definitions/types'
import Dummy from '../modules/dummy'

class TelegramConfiguration {
  api: ConfigurationAPI = Dummy.configurationAPI
  default: ConfigurationDefault = Dummy.configurationDefault
  handler: ConfigurationHandler = Dummy.configurationHandler
}

const telegramConfiguration = new TelegramConfiguration()
export default telegramConfiguration
