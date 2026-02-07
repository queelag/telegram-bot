import type { FetchError } from '@aracna/core'
import type { RemoveChatVerification, RemoveUserVerification, VerifyChat, VerifyUser } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api.js'
import type { TelegramApiConfig } from '../definitions/interfaces.js'

export async function removeChatVerification(body: RemoveChatVerification, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, RemoveChatVerification>('removeChatVerification', body, config)
}

export async function removeUserVerification(body: RemoveUserVerification, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, RemoveUserVerification>('removeUserVerification', body, config)
}

export async function verifyChat(body: VerifyChat, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, VerifyChat>('verifyChat', body, config)
}

export async function verifyUser(body: VerifyUser, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, VerifyUser>('verifyUser', body, config)
}
