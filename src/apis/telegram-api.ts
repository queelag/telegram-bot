import { type FetchError, isObject, type RequestMethod, RestAPI, serializeFormData } from '@aracna/core'
import { TelegramApiDefinitions } from '../definitions/telegram-api-definitions'

class API extends RestAPI<TelegramApiDefinitions.Config> {
  async post<V, W, X = undefined>(path: string, body: W | undefined, config: TelegramApiDefinitions.Config): Promise<V | FetchError<X>> {
    let response: TelegramApiDefinitions.Response<V> | FetchError<X>

    response = await super.post('/bot' + config.token + '/' + path, body, config)
    if (response instanceof Error) return response

    return response.data.result
  }

  async transformBody<V>(method: RequestMethod, path: string, body: V, config: TelegramApiDefinitions.Config): Promise<FormData | undefined> {
    switch (method) {
      case 'GET':
      case 'POST':
        return isObject(body) ? serializeFormData(body) : undefined
    }
  }
}

export const TelegramAPI: API = new API('https://api.telegram.org')
