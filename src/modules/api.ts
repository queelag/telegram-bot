import http, { ClientRequest, IncomingMessage, RequestOptions } from 'http'
import https from 'https'
import tc from './tc'

class API {
  private host: string = ''
  private pathname: string = ''
  private port: number = 0
  private protocol: string = ''

  constructor(host: string, pathname: string, port: number = 443, protocol: string = 'https') {
    this.host = host
    this.pathname = pathname
    this.port = port
    this.protocol = protocol
  }

  async get<T extends object>(path: string): Promise<T | Error> {
    return new Promise((resolve) => {
      let request: ClientRequest, data: any

      request = this.module.request({ ...this.options, path: this.pathname + path, method: 'GET' })
      data = ''

      request.on('response', (response: IncomingMessage) => {
        response.on('data', (chunk: any) => (data += chunk))
        response.on('end', () =>
          resolve(
            tc<T>(() => JSON.parse(data))
          )
        )
      })
      request.on('error', (error: Error) => resolve(error))
    })
  }

  async post<T extends object, U>(path: string, body: T): Promise<U | Error> {
    return new Promise((resolve) => {
      let request: ClientRequest, data: any

      request = this.module.request({ ...this.options, path: this.pathname + path, method: 'POST' })
      data = ''

      request.on('response', (response: IncomingMessage) => {
        response.on('data', (chunk: any) => (data += chunk))
        response.on('close', () =>
          resolve(
            tc<U>(() => JSON.parse(data))
          )
        )
      })
      request.on('error', (error: Error) => resolve(error))

      request.write(
        tc<string>(() => JSON.stringify(body))
      )
      request.end()
    })
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

  get options(): RequestOptions {
    return {
      protocol: this.protocol + ':',
      host: this.host,
      port: this.port,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
}

export default API
