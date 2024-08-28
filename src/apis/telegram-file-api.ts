import { FetchError, type FetchResponse, RestAPI } from '@aracna/core'
import type { TelegramFileApiConfig } from '../definitions/interfaces'

class API extends RestAPI<TelegramFileApiConfig> {
  async get<V, W = undefined>(path: string, config?: TelegramFileApiConfig): Promise<V | FetchError<W>> {
    let token: string | undefined, response: FetchResponse<V> | FetchError<W>

    token = config?.token ?? this.config?.token
    if (!token) return FetchError.from(new Error(`The token is required.`))

    response = await super.get('/file/bot' + token + '/' + path, config)
    if (response instanceof Error) return response

    return response.data
  }

  getToken(): string | undefined {
    return this.config.token
  }

  setToken(token?: string): this {
    this.config.token = token
    return this
  }
}

export const TelegramFileAPI: API = new API('https://api.telegram.org')
