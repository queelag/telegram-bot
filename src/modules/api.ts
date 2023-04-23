import { API as CoreAPI, APIConfig, FetchError, FetchResponse, Polyfill, RequestMethod, serializeFormData } from '@aracna/core'
import { APIResponseData } from '../definitions/interfaces'

export class API extends CoreAPI {
  async post<V, W, X = undefined>(path: string, body?: W, config?: APIConfig<void>): Promise<V | FetchError<X>> {
    let response: FetchResponse<APIResponseData<V>> | FetchError<X>

    response = await this.handle(RequestMethod.POST, path, body, config)
    if (response instanceof Error) return response

    return response.data.result
  }

  async transformBody<V>(method: RequestMethod, path: string, body: V, config: APIConfig<void>): Promise<FormData> {
    switch (method) {
      case RequestMethod.GET:
      case RequestMethod.POST:
        await Polyfill.blob()
        await Polyfill.file()
        await Polyfill.formData()

        return serializeFormData(typeof body === 'object' ? (body as object) : {})
      default:
        return serializeFormData({})
    }
  }
}
