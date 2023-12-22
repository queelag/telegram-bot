import { FetchError, FetchResponse, RequestMethod, RestAPI, RestApiConfig, importNodeFetch, serializeFormData, useNodeFetch } from '@aracna/core'
import { APIResponseData } from '../definitions/interfaces'

export class API extends RestAPI {
  async post<V, W, X = undefined>(path: string, body?: W, config?: RestApiConfig<void>): Promise<V | FetchError<X>> {
    let response: FetchResponse<APIResponseData<V>> | FetchError<X>

    response = await this.post(path, body, config)
    if (response instanceof Error) return response

    return response.data.result
  }

  async transformBody<V>(method: RequestMethod, path: string, body: V, config: RestApiConfig<void>): Promise<FormData> {
    switch (method) {
      case 'GET':
      case 'POST':
        await useNodeFetch(await importNodeFetch())
        return serializeFormData(typeof body === 'object' ? (body as object) : {})
      default:
        return serializeFormData({})
    }
  }
}
