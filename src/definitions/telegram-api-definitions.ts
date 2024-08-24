import type { FetchResponse, RestApiConfig } from '@aracna/core'

export namespace TelegramApiDefinitions {
  export interface Config extends RestApiConfig {
    token: string
  }

  export interface Response<T> extends FetchResponse<ResponseData<T>> {}

  export interface ResponseData<T> {
    ok: boolean
    result: T
  }
}
