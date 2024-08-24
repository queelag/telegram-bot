import { CallbackQueryBody, HandlerOptions, MessageBody } from './interfaces'

export const DEFAULT_CALLBACK_QUERY_BODY: () => CallbackQueryBody = () => ({
  d: null,
  t: ''
})

export const DEFAULT_HANDLER_OPTIONS: () => HandlerOptions = () => ({
  deleteOnCallbackQuery: true,
  deleteOnMessageStart: true,
  deleteOnReply: true
})

export const DEFAULT_MESSAGE_BODY: () => MessageBody = () => ({
  data: null,
  type: ''
})

export const REGEXP_COMMAND: RegExp = /\/[a-z_]+/m
export const REGEXP_COMMAND_WITH_USERNAME: RegExp = /\/[a-zA-Z0-9_@]+/
