import type { InlineKeyboardButton, LoginUrl, SwitchInlineQueryChosenChat, WebAppInfo } from '@aracna/telegram-bot-types'
import type { EncodeCallbackQueryBodyOptions } from '../definitions/interfaces.js'
import { encodeCallbackQueryBody } from './callback-query-utils.js'

export function getInlineKeyboardCallbackButton(text: string, options?: EncodeCallbackQueryBodyOptions): InlineKeyboardButton {
  return { text, callback_data: encodeCallbackQueryBody(options) }
}

export function getInlineKeyboardGameButton(text: string, game: string): InlineKeyboardButton {
  return { text, callback_game: game }
}

export function getInlineKeyboardLoginButton(text: string, url: string, fields?: Partial<LoginUrl>): InlineKeyboardButton {
  return { text, login_url: { url, ...fields } }
}

export function getInlineKeyboardPayButton(text: string): InlineKeyboardButton {
  return { text, pay: true }
}

export function getInlineKeyboardQueryButton(text: string, query: string): InlineKeyboardButton {
  return { text, switch_inline_query: query }
}

export function getInlineKeyboardQueryChosenChatButton(text: string, query: SwitchInlineQueryChosenChat): InlineKeyboardButton {
  return { text, switch_inline_query_chosen_chat: query }
}

export function getInlineKeyboardQueryCurrentChatButton(text: string, query: string): InlineKeyboardButton {
  return { text, switch_inline_query_current_chat: query }
}

export function getInlineKeyboardTextButton(text: string): InlineKeyboardButton {
  return { text }
}

export function getInlineKeyboardUrlButton(text: string, url: string): InlineKeyboardButton {
  return { text, url }
}

export function getInlineKeyboardWebAppButton(text: string, app: WebAppInfo): InlineKeyboardButton {
  return { text, web_app: app }
}
