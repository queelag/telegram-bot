import {
  DeferredPromise,
  EventEmitterListenerCallback,
  type FetchError,
  isObject,
  Queue,
  QueueFunction,
  QueueProcess,
  type RequestMethod,
  RestAPI,
  serializeFormData
} from '@aracna/core'
import { TelegramApiDefinitions } from '../definitions/telegram-api-definitions'

class API extends RestAPI<TelegramApiDefinitions.Config> {
  queue: Queue = new Queue({ autostart: true })

  async post<V, W, X = undefined>(path: string, body: W | undefined, config: TelegramApiDefinitions.Config): Promise<V | FetchError<X>> {
    let fn: QueueFunction, callback: EventEmitterListenerCallback, promise: DeferredPromise<V | FetchError<X>>

    promise = new DeferredPromise()

    fn = async () => {
      let response: TelegramApiDefinitions.Response<V> | FetchError<X>

      response = await super.post('/bot' + config.token + '/' + path, body, config)
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

  async transformBody<V>(method: RequestMethod, path: string, body: V, config: TelegramApiDefinitions.Config): Promise<V | FormData | undefined> {
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
}

export const TelegramAPI: API = new API('https://api.telegram.org', {
  decode: {
    json: {
      castBigIntStringToBigInt: true,
      castUnsafeIntToBigInt: true
    }
  },
  token: undefined
})
