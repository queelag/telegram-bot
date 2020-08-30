import { forEach, reduce, size } from 'lodash'
import FormData from 'form-data'
import ID from '../modules/id'
import FileType from 'file-type'
import BufferUtils from './buffer.utils'

class JSONUtils {
  static async toFormData(json: object): Promise<FormData> {
    let form: FormData, keys: string[], values: any[], iteratee: (v: any, k: string) => any

    form = new FormData()
    keys = Object.keys(json)
    values = Object.values(json)

    iteratee = async (v: any, k: string) => {
      switch (true) {
        case Array.isArray(v):
          form.append(k, JSON.stringify(v))
          break
        case Buffer.isBuffer(v):
          form.append(k, v, { filename: ID.unique() + (await BufferUtils.toFileExtension(v)) })
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

    for (let i = 0; i < size(json); ) {
      await iteratee(values[i], keys[i])
      i++
    }

    return form
  }
}

export default JSONUtils
