import FormData from 'form-data'
import http, { ClientRequest, IncomingMessage, OutgoingHttpHeaders, RequestOptions } from 'http'
import https from 'https'
import { Protocol } from '../definitions/types'
import JSONUtils from '../utils/json.utils'
import tc from './tc'
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

  async get<T>(path: string): Promise<T | Error> {
    return new Promise((resolve) => {
      let request: ClientRequest, chunks: any[]

      request = this.request(this.options(path, 'GET'))
      chunks = []

      request.on('response', (response: IncomingMessage) => {
        response.on('data', (chunk: any) => chunks.push(chunk))
        response.on('close', () => {
          if (response.statusCode !== 200) {
            tc<void>(() => console.error(chunks))
            return resolve(new Error(response.statusMessage))
          }

          resolve(tc<T>(() => Buffer.concat(chunks) as any))
        })
      })

      request.on('error', (error: Error) => {
        console.error(error)
        resolve(error)
      })

      request.end()
    })
  }

  async post<T extends object, U>(path: string, body: T = [0] as T): Promise<U | Error> {
    return new Promise(async (resolve) => {
      let form: FormData | Error, request: ClientRequest, chunks: string

      form = await tcp<FormData>(() => JSONUtils.toFormData(body))
      if (form instanceof Error) return resolve(form)

      request = this.request(this.options(path, 'POST', form.getHeaders()))
      chunks = ''

      request.on('response', (response: IncomingMessage) => {
        response.on('data', (chunk: any) => (chunks += chunk))
        response.on('close', () => {
          if (response.statusCode !== 200) {
            tc<void>(() => console.error(JSON.parse(chunks)))
            return resolve(new Error(response.statusMessage))
          }

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

  get request(): (options: RequestOptions | string | URL, callback?: (res: IncomingMessage) => void) => ClientRequest {
    switch (this.protocol) {
      case 'http':
        return http.request
      case 'https':
        return https.request
      default:
        return https.request
    }
  }
}

export default API
