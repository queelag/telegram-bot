import { type FetchError, FetchResponse, RestAPI } from '@aracna/core'
import { TelegramApiDefinitions } from '../definitions/telegram-api-definitions'

class API extends RestAPI<TelegramApiDefinitions.Config> {
  async get<V, W = undefined>(path: string, config: TelegramApiDefinitions.Config): Promise<V | FetchError<W>> {
    let response: FetchResponse<V> | FetchError<W>

    response = await super.get('/file/bot' + config.token + '/' + path, config)
    if (response instanceof Error) return response

    return response.data
  }
}

export const TelegramFileAPI: API = new API('https://api.telegram.org')
