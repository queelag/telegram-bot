import {
  DeferredPromise,
  EventEmitterListenerCallback,
  FetchError,
  isObject,
  Queue,
  QueueFunction,
  QueueProcess,
  type RequestMethod,
  RestAPI,
  serializeFormData
} from '@aracna/core'
import { TelegramApiConfig, TelegramApiResponse } from '../definitions/interfaces'

class API extends RestAPI<TelegramApiConfig> {
  queue: Queue = new Queue({ autostart: true })

  async post<V, W, X = undefined>(path: string, body: W | undefined, config?: TelegramApiConfig): Promise<V | FetchError<X>> {
    let token: string | undefined, promise: DeferredPromise<V | FetchError<X>>, fn: QueueFunction, callback: EventEmitterListenerCallback

    token = config?.token ?? this.config?.token
    if (!token) return FetchError.from(new Error(`The token is required.`))

    promise = new DeferredPromise()

    fn = async () => {
      let response: TelegramApiResponse<V> | FetchError<X>

      response = await super.post('/bot' + token + '/' + path, body, config)
      if (response instanceof Error) return response

      return response.data.result
    }

    callback = (process: QueueProcess) => {
      if (process.fn === fn) {
        promise.resolve(process.value as V)
        this.queue.off('process-fulfill', callback)
      }
    }

    this.queue.on('process-fulfill', callback)
    this.queue.push(fn)

    return promise.instance
  }

  async transformBody<V>(method: RequestMethod, path: string, body: V, config: TelegramApiConfig): Promise<V | FormData | undefined> {
    if (method !== 'POST') {
      return
    }

    if (!isObject(body)) {
      return
    }

    for (let key in body) {
      if (body[key] instanceof Blob) {
        return serializeFormData(body)
      }
    }

    return body
  }

  getToken(): string | undefined {
    return this.config.token
  }

  setToken(token?: string): this {
    this.config.token = token
    return this
  }
}

export const TelegramAPI: API = new API('https://api.telegram.org', {
  decode: {
    json: {
      castBigIntStringToBigInt: true,
      castUnsafeIntToBigInt: true
    }
  },
  encode: {
    json: {
      castBigIntToString: true
    }
  }
})
