import { startCase } from 'lodash'

class StringUtils {
  static startCase(string: string): string {
    return startCase(string).replace(/ /g, '')
  }
}

export default StringUtils
