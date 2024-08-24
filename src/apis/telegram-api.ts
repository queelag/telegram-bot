import { type FetchError, type RequestMethod, RestAPI, importNodeFetch, serializeFormData, useNodeFetch } from '@aracna/core'
import { TelegramApiDefinitions } from '../definitions/telegram-api-definitions'

class API extends RestAPI<TelegramApiDefinitions.Config> {
  async post<V, W, X = undefined>(path: string, body: W | undefined, config: TelegramApiDefinitions.Config): Promise<V | FetchError<X>> {
    let response: TelegramApiDefinitions.Response<V> | FetchError<X>

    response = await this.post(config.token + '/', body, config)
    if (response instanceof Error) return response

    return response.data.result
  }

  async transformBody<V>(method: RequestMethod, path: string, body: V, config: TelegramApiDefinitions.Config): Promise<FormData> {
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

export const TelegramAPI: API = new API('https://api.telegram.org/bot/')
export const TelegramFileAPI: API = new API('https://api.telegram.org/file/bot/')
