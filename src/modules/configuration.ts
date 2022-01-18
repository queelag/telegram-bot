import { ConfigurationAPI, ConfigurationDefault, ConfigurationHandler } from '../definitions/interfaces'
import { Dummy } from './dummy'

class _ {
  api: ConfigurationAPI = Dummy.configurationAPI
  default: ConfigurationDefault = Dummy.configurationDefault
  handler: ConfigurationHandler = Dummy.configurationHandler
}

export const Configuration = new _()
