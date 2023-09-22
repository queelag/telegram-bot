import { APIConfig, API as CoreAPI, FetchError, FetchResponse, RequestMethod, serializeFormData, tcp, useNodeFetch } from '@aracna/core'
import { APIResponseData } from '../definitions/interfaces'

export class API extends CoreAPI {
  async post<V, W, X = undefined>(path: string, body?: W, config?: APIConfig<void>): Promise<V | FetchError<X>> {
    let response: FetchResponse<APIResponseData<V>> | FetchError<X>

    response = await this.handle('POST', path, body, config)
    if (response instanceof Error) return response

    return response.data.result
  }

  async transformBody<V>(method: RequestMethod, path: string, body: V, config: APIConfig<void>): Promise<FormData> {
    switch (method) {
      case 'GET':
      case 'POST':
        await useNodeFetch(await tcp(() => import('node-fetch')))
        return serializeFormData(typeof body === 'object' ? (body as object) : {})
      default:
        return serializeFormData({})
    }
  }
}
