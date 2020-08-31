import { reduce } from 'lodash'
import FormData from 'form-data'
import ID from '../modules/id'
import BufferUtils from './buffer.utils'

class JSONUtils {
  static async toFormData(json: object): Promise<FormData> {
    let form: FormData, iteratee: (v: any, k: string) => any

    form = new FormData()

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

    await Promise.all(reduce(json, (r: Promise<any>[], v: any, k: string) => [...r, () => iteratee(v, k)], []))

    return form
  }
}

export default JSONUtils
