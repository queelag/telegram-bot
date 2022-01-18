import { API as CoreAPI, APIConfig, FetchError, FetchResponse, ObjectUtils, Polyfill, RequestMethod } from '@queelag/core'
import { APIResponseData } from '../definitions/interfaces'

export class API extends CoreAPI {
  async transformBody<V>(method: RequestMethod, path: string, body: V, config: APIConfig<void>): Promise<FormData> {
    switch (method) {
      case RequestMethod.GET:
      case RequestMethod.POST:
        await Polyfill.blob()
        await Polyfill.file()
        await Polyfill.formData()

        return ObjectUtils.toFormData(typeof body === 'object' ? body : {})
    }
  }

  async post<V, W, X = undefined>(path: string, body?: W, config?: APIConfig<void>): Promise<V | FetchError<X>> {
    let response: FetchResponse<APIResponseData<V>> | FetchError<X>

    response = await this.handle(RequestMethod.POST, path, body, config)
    if (response instanceof Error) return response

    return response.data.result
  }
}
