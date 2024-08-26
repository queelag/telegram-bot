import { generateRandomString } from '@aracna/core'
import { SwitchInlineQueryChosenChat, WebAppInfo } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { encodeCallbackQueryBody } from '../../src/utils/callback-query-utils'
import {
  getInlineKeyboardCallbackButton,
  getInlineKeyboardGameButton,
  getInlineKeyboardLoginButton,
  getInlineKeyboardPayButton,
  getInlineKeyboardQueryButton,
  getInlineKeyboardQueryChosenChatButton,
  getInlineKeyboardQueryCurrentChatButton,
  getInlineKeyboardTextButton,
  getInlineKeyboardUrlButton,
  getInlineKeyboardWebAppButton
} from '../../src/utils/inline-keyboard-utils'

describe('Inline Keyboard Utils', () => {
  it('gets the inline keyboard callback button without chat_id', () => {
    let data: string, text: string, type: string

    data = generateRandomString()
    text = generateRandomString()
    type = generateRandomString()

    expect(getInlineKeyboardCallbackButton(text, data, type)).toStrictEqual({ callback_data: encodeCallbackQueryBody(data, type), text })
  })

  it('gets the inline keyboard callback button with chat_id', () => {
    let chatID: number, data: string, text: string, type: string

    chatID = 0
    data = generateRandomString()
    text = generateRandomString()
    type = generateRandomString()

    expect(getInlineKeyboardCallbackButton(text, data, type, chatID)).toStrictEqual({ callback_data: encodeCallbackQueryBody(data, type, chatID), text })
  })

  it('gets the inline keyboard game button', () => {
    let game: string, text: string

    game = generateRandomString()
    text = generateRandomString()

    expect(getInlineKeyboardGameButton(text, game)).toStrictEqual({ callback_game: game, text })
  })

  it('gets the inline keyboard login button', () => {
    let text: string, url: string

    text = generateRandomString()
    url = generateRandomString()

    expect(getInlineKeyboardLoginButton(text, url)).toStrictEqual({ text, login_url: { url } })
  })

  it('gets the inline keyboard pay button', () => {
    let text: string

    text = generateRandomString()

    expect(getInlineKeyboardPayButton(text)).toStrictEqual({ pay: true, text })
  })

  it('gets the inline keyboard query button', () => {
    let query: string, text: string

    query = generateRandomString()
    text = generateRandomString()

    expect(getInlineKeyboardQueryButton(text, query)).toStrictEqual({ switch_inline_query: query, text })
  })

  it('gets the inline keyboard query chosen chat button', () => {
    let query: SwitchInlineQueryChosenChat, text: string

    query = {}
    text = generateRandomString()

    expect(getInlineKeyboardQueryChosenChatButton(text, query)).toStrictEqual({ switch_inline_query_chosen_chat: query, text })
  })

  it('gets the inline keyboard query current chat button', () => {
    let query: string, text: string

    query = generateRandomString()
    text = generateRandomString()

    expect(getInlineKeyboardQueryCurrentChatButton(text, query)).toStrictEqual({ switch_inline_query_current_chat: query, text })
  })

  it('gets the inline keyboard text button', () => {
    let text: string

    text = generateRandomString()

    expect(getInlineKeyboardTextButton(text)).toStrictEqual({ text })
  })

  it('gets the inline keyboard url button', () => {
    let text: string, url: string

    text = generateRandomString()
    url = generateRandomString()

    expect(getInlineKeyboardUrlButton(text, url)).toStrictEqual({ text, url })
  })

  it('gets the inline keyboard web app button', () => {
    let info: WebAppInfo, text: string

    info = { url: generateRandomString() }
    text = generateRandomString()

    expect(getInlineKeyboardWebAppButton(text, info)).toStrictEqual({ text, web_app: info })
  })
})
