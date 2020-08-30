import { forEach, reduce } from 'lodash'
import FormData from 'form-data'
import ID from '../modules/id'

class JSONUtils {
  static toFormData(json: object): FormData {
    let form: FormData, iteratee: (v: any, k: string) => any

    form = new FormData()

    iteratee = (v: any, k: string) => {
      switch (true) {
        case Array.isArray(v):
          form.append(k, JSON.stringify(v))
          break
        case Buffer.isBuffer(v):
          form.append(k, v, { filename: ID.unique() })
          break
        case typeof v === 'object':
          form.append(k, JSON.stringify(v))
          break
        case typeof v === 'boolean':
          form.append(k, v.toString())
          break
        default:
          form.append(k, v)
          break
      }
    }

    forEach(json, iteratee)

    return form
  }
}

export default JSONUtils
