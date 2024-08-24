// import { clearInterval, setInterval, setTimeout, type FetchError } from '@aracna/core'
// import type { GetUpdates, Update } from '@aracna/telegram-bot-types'
// import { UpdateType } from '../definitions/types'
// import { getUpdates } from './get'

//   export function startPolling(token: string, ms: number = 1000, params?: Partial<GetUpdates>): void {
//     setInterval(() => poll(token,params), ms, 'TELEGRAM_POLL')
//   }

//   export function stopPolling(): void {
//     clearInterval('TELEGRAM_POLL')
//   }

//     async function poll(token: string, params?: Partial<GetUpdates>): Promise<Update[] | FetchError> {
//     let body: GetUpdates, updates: Update[] | FetchError

//     body = {
//       allowed_updates: [ 'BUSINESS_CONNECTION'
// , 'BUSINESS_MESSAGE'
// , 'CALLBACK_QUERY'
// , 'CHANNEL_POST'
// , 'CHAT_BOOST'
// , 'CHAT_JOIN_REQUEST'
// , 'CHAT_MEMBER'
// , 'CHOSEN_INLINE_RESULT'
// , 'DELETED_BUSINESS_MESSAGES'
// , 'DOCUMENT'
// , 'EDITED_BUSINESS_MESSAGE'
// , 'EDITED_CHANNEL_POST'
// , 'EDITED_MESSAGE'
// , 'INLINE_QUERY'
// , 'MESSAGE'
// , 'MESSAGE_REACTION'
// , 'MESSAGE_REACTION_COUNT'
// , 'MY_CHAT_MEMBER'
// , 'POLL'
// , 'POLL_ANSWER'
// , 'PRE_CHECKOUT_QUERY'
// , 'REMOVED_CHAT_BOOST'
// , 'REPLY_TO_MESSAGE'
// , 'SHIPPING_QUERY'
// , 'START'],
//       ...params
//     }

//     updates = await getUpdates(token,body)
//     if (updates instanceof Error) return updates

//     updates.forEach((v: Update) => this.telegram.handle(v))
//     this.offset = updates.length > 0 ? updates[updates.length - 1].update_id + 1 : this.offset

//     return updates
//   }
