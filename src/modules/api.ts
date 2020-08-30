import http, { ClientRequest, IncomingMessage, RequestOptions, OutgoingHttpHeaders } from 'http'
import https from 'https'
import tc from './tc'
import JSONUtils from '../utils/json.utils'
import FormData from 'form-data'
import { Protocol } from '../definitions/types'
import tcp from './tcp'

class API {
  private host: string = ''
  private pathname: string = ''
  private port: number = 0
  private protocol: Protocol = 'https'

  constructor(host: string, pathname: string, port: number = 443, protocol: Protocol = 'https') {
    this.host = host
    this.pathname = pathname
    this.port = port
    this.protocol = protocol
  }

  async get<T extends object>(path: string): Promise<T | Error> {
    return new Promise((resolve) => {
      let request: ClientRequest, data: any

      request = this.module.request(this.options(path, 'GET'))
      data = ''

      request.on('response', (response: IncomingMessage) => {
        response.on('data', (chunk: any) => (data += chunk))
        response.on('end', () =>
          resolve(
            tc<T>(() => JSON.parse(data))
          )
        )
      })

      request.on('error', (error: Error) => {
        console.error(error)
        resolve(error)
      })
    })
  }

  async post<T extends object, U>(path: string, body: T = [0] as T): Promise<U | Error> {
    return new Promise(async (resolve) => {
      let form: FormData | Error, request: ClientRequest, chunks: any

      form = await tcp<FormData>(() => JSONUtils.toFormData(body))
      if (form instanceof Error) return resolve(form)

      request = this.module.request(this.options(path, 'POST', form.getHeaders()))
      chunks = ''

      request.on('response', (response: IncomingMessage) => {
        response.on('data', (chunk: any) => (chunks += chunk))
        response.on('close', () => {
          resolve(tc<U>(() => JSON.parse(chunks).result))
        })
      })

      request.on('error', (error: Error) => {
        console.error(error)
        resolve(error)
      })

      request.write(form.getBuffer())
      request.end()
    })
  }

  options(path: string, method: string, headers: OutgoingHttpHeaders = {}): RequestOptions {
    return {
      protocol: this.protocol + ':',
      host: this.host,
      port: this.port,
      path: this.pathname + path,
      method: method,
      headers: headers
    }
  }

  get module(): typeof http | typeof https {
    switch (this.protocol) {
      case 'http':
        return http
      case 'https':
        return https
      default:
        return https
    }
  }
}

export default API
