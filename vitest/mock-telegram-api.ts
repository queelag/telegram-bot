import { generateRandomString, isArray, isStringJSON } from '@aracna/core'
import {
  BotCommand,
  BotDescription,
  BotName,
  BotShortDescription,
  BusinessConnection,
  Chat,
  ChatAdministratorRights,
  ChatInviteLink,
  ChatMember,
  ChatMemberAdministrator,
  File,
  ForumTopic,
  GameHighScore,
  MenuButton,
  Message,
  MessageId,
  Poll,
  SentWebAppMessage,
  StarTransactions,
  Sticker,
  StickerSet,
  Update,
  User,
  UserChatBoosts,
  UserProfilePhotos,
  WebhookInfo
} from '@aracna/telegram-bot-types'
import { fastifyMultipart, MultipartFields, MultipartFile } from '@fastify/multipart'
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { afterAll, beforeAll } from 'vitest'
import { TelegramAPI } from '../src/apis/telegram-api'
import { BOT_ID, BOT_NAME, BOT_TOKEN, PRIVATE_CHAT_ID } from './constants'

let app: FastifyInstance

function getFieldValue<T>(fields: MultipartFields | undefined, name: string): T | undefined {
  if (typeof fields === 'undefined') {
    return
  }

  if (isArray(fields[name])) {
    return
  }

  if (fields[name]?.type !== 'field') {
    return
  }

  if (typeof fields[name]?.value === 'string' && isStringJSON(fields[name]?.value)) {
    return JSON.parse(fields[name]?.value)
  }

  return fields[name]?.value as T
}

beforeAll(async () => {
  let url: string

  app = fastify()
  app.register(fastifyMultipart)

  app.post('/bot:token/:method', async (req: FastifyRequest, res: FastifyReply) => {
    let file: MultipartFile | undefined, fields: MultipartFields | undefined

    const token: string = req.params?.['token']
    const method: string = req.params?.['method']

    const body: Record<string, any> | undefined = req.body as any

    if (req.isMultipart()) {
      file = await req.file()
      fields = file?.fields
    }

    if (token !== BOT_TOKEN) {
      return res.status(401).send({ ok: false })
    }

    switch (method) {
      case 'addStickerToSet':
      case 'answerCallbackQuery':
      case 'answerInlineQuery':
      case 'answerPreCheckoutQuery':
      case 'answerShippingQuery':
      case 'approveChatJoinRequest':
      case 'banChatMember':
      case 'banChatSenderChat':
      case 'closeForumTopic':
      case 'closeGeneralForumTopic':
      case 'closeWebhook':
      case 'createNewStickerSet':
      case 'declineChatJoinRequest':
      case 'deleteChatPhoto':
      case 'deleteChatStickerSet':
      case 'deleteForumTopic':
      case 'deleteMessage':
      case 'deleteMessages':
      case 'deleteMyCommands':
      case 'deleteStickerFromSet':
      case 'deleteStickerSet':
      case 'deleteWebhook':
      case 'editForumTopic':
      case 'editGeneralForumTopic':
      case 'hideGeneralForumTopic':
      case 'leaveChat':
      case 'logOut':
      case 'pinChatMessage':
      case 'promoteChatMember':
      case 'refundStarPayment':
      case 'reopenForumTopic':
      case 'reopenGeneralForumTopic':
      case 'replaceStickerInSet':
      case 'restrictChatMember':
      case 'sendChatAction':
      case 'setChatAdministratorCustomTitle':
      case 'setChatDescription':
      case 'setChatMenuButton':
      case 'setChatPermissions':
      case 'setChatPhoto':
      case 'setChatStickerSet':
      case 'setChatTitle':
      case 'setCustomEmojiStickerSetThumbnail':
      case 'setGameScore':
      case 'setMessageReaction':
      case 'setMyCommands':
      case 'setMyDefaultAdministratorRights':
      case 'setMyDescription':
      case 'setMyName':
      case 'setMyShortDescription':
      case 'setPassportDataErrors':
      case 'setStickerEmojiList':
      case 'setStickerKeywords':
      case 'setStickerMaskPosition':
      case 'setStickerPositionInSet':
      case 'setStickerSetThumbnail':
      case 'setStickerSetTitle':
      case 'setWebhook':
      case 'stopMessageLiveLocation':
      case 'unbanChatMember':
      case 'unbanChatSenderChat':
      case 'unhideGeneralForumTopic':
      case 'unpinAllChatMessages':
      case 'unpinAllForumTopicMessages':
      case 'unpinAllGeneralForumTopicMessages':
      case 'unpinChatMessage':
        return res.send({ ok: true, result: true })
      case 'answerWebAppQuery': {
        let result: SentWebAppMessage

        result = {}

        return res.send({ ok: true, result })
      }
      case 'copyMessage': {
        let result: MessageId

        result = { message_id: Number.MAX_SAFE_INTEGER }

        return res.send({ ok: true, result })
      }
      case 'copyMessages': {
        let result: MessageId[]

        result = [{ message_id: Number.MAX_SAFE_INTEGER - 1 }, { message_id: Number.MAX_SAFE_INTEGER }]

        return res.send({ ok: true, result })
      }
      case 'createChatInviteLink':
      case 'createChatSubscriptionInviteLink':
      case 'revokeChatInviteLink': {
        let result: ChatInviteLink

        result = {
          invite_link: '',
          creator: { first_name: BOT_NAME, id: BOT_ID, is_bot: true },
          creates_join_request: false,
          is_primary: false,
          is_revoked: false
        }

        return res.send({ ok: true, result })
      }
      case 'createForumTopic': {
        let result: ForumTopic

        result = { icon_color: 0, message_thread_id: 0, name: '' }

        return res.send({ ok: true, result })
      }
      case 'createInvoiceLink':
        return res.send({ ok: true, result: '' })
      case 'editChatInviteLink':
      case 'editChatSubscriptionInviteLink': {
        let result: ChatInviteLink

        result = { invite_link: '', creator: { first_name: '', id: BOT_ID, is_bot: true }, creates_join_request: false, is_primary: false, is_revoked: false }

        return res.send({ ok: true, result })
      }
      case 'getWebhookInfo': {
        let result: WebhookInfo

        result = { has_custom_certificate: false, pending_update_count: 0, url: '' }

        return res.send({ ok: true, result })
      }
      case 'editMessageCaption':
      case 'editMessageLiveLocation':
      case 'editMessageMedia':
      case 'editMessageReplyMarkup':
      case 'editMessageText':
      case 'sendAnimation':
      case 'sendAudio':
      case 'sendDocument':
      case 'sendContact':
      case 'sendDice':
      case 'sendGame':
      case 'sendInvoice':
      case 'sendLocation':
      case 'sendMessage':
      case 'sendPaidMedia':
      case 'sendPhoto':
      case 'sendPoll':
      case 'sendSticker':
      case 'sendVenue':
      case 'sendVideo':
      case 'sendVideoNote':
      case 'sendVoice': {
        let result: Message

        result = {
          caption: getFieldValue(fields, 'caption'),
          chat: { id: 0, type: '' },
          date: Date.now(),
          location: {
            latitude: body?.latitude,
            longitude: body?.longitude
          },
          message_id: 0,
          reply_markup: body?.reply_markup,
          text: body?.text
        }

        return res.send({ ok: true, result })
      }
      case 'exportChatInviteLink':
        return res.send({ ok: true, result: '' })
      case 'forwardMessage': {
        let result: Message

        result = { chat: { id: 0, type: '' }, date: Date.now(), message_id: Number.MAX_SAFE_INTEGER }

        return res.send({ ok: true, result })
      }
      case 'forwardMessages': {
        let result: MessageId[]

        result = [{ message_id: Number.MAX_SAFE_INTEGER - 1 }, { message_id: Number.MAX_SAFE_INTEGER }]

        return res.send({ ok: true, result })
      }
      case 'getBusinessConnection': {
        let result: BusinessConnection

        result = { can_reply: false, date: Date.now(), id: '', is_enabled: false, user: { first_name: '', id: 0, is_bot: false }, user_chat_id: 0 }

        return res.send({ ok: true, result })
      }
      case 'getChat': {
        let result: Chat

        result = { id: body?.chat_id, type: '' }

        return res.send({ ok: true, result })
      }
      case 'getChatAdministrators': {
        let result: ChatMemberAdministrator[]

        result = [
          {
            can_be_edited: false,
            can_change_info: false,
            can_delete_messages: false,
            can_delete_stories: false,
            can_edit_stories: false,
            can_invite_users: false,
            can_manage_chat: false,
            can_manage_video_chats: false,
            can_post_stories: false,
            can_promote_members: false,
            can_restrict_members: false,
            is_anonymous: false,
            status: 'administrator',
            user: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: true }
          }
        ]

        return res.send({ ok: true, result })
      }
      case 'getChatMember': {
        let result: ChatMember

        result = { user: { first_name: '', id: body?.user_id, is_bot: false }, status: '' }

        return res.send({ ok: true, result })
      }
      case 'getChatMemberCount':
        return res.send({ ok: true, result: 2 })
      case 'getChatMenuButton': {
        let result: MenuButton

        result = { text: '', type: 'default' }

        return res.send({ ok: true, result })
      }
      case 'getCustomEmojiStickers': {
        let result: Sticker[]

        result = []

        return res.send({ ok: true, result })
      }
      case 'getFile':
      case 'uploadStickerFile': {
        let result: File

        result = { file_id: '', file_path: generateRandomString(), file_unique_id: '' }

        return res.send({ ok: true, result })
      }
      case 'getForumTopicIconStickers': {
        let result: Sticker[]

        result = [
          {
            file_id: '',
            file_unique_id: '',
            height: 0,
            is_animated: false,
            is_video: false,
            type: '',
            width: 0
          }
        ]

        return res.send({ ok: true, result })
      }
      case 'getGameHighScores': {
        let result: GameHighScore[]

        result = []

        return res.send({ ok: true, result })
      }
      case 'getMe': {
        let result: User

        result = { first_name: '', id: BOT_ID, is_bot: true }

        return res.send({ ok: true, result })
      }
      case 'getMyCommands': {
        let result: BotCommand[]

        result = []

        return res.send({ ok: true, result })
      }
      case 'getMyDefaultAdministratorRights': {
        let result: ChatAdministratorRights

        result = {
          can_change_info: false,
          can_delete_messages: false,
          can_delete_stories: false,
          can_edit_stories: false,
          can_invite_users: false,
          can_manage_chat: false,
          can_manage_topics: false,
          can_manage_video_chats: false,
          can_pin_messages: false,
          can_post_stories: false,
          can_promote_members: false,
          can_restrict_members: false,
          is_anonymous: false
        }

        return res.send({ ok: true, result })
      }
      case 'getMyDescription': {
        let result: BotDescription

        result = { description: '' }

        return res.send({ ok: true, result })
      }
      case 'getMyName': {
        let result: BotName

        result = { name: BOT_NAME }

        return res.send({ ok: true, result })
      }
      case 'getMyShortDescription': {
        let result: BotShortDescription

        result = { short_description: '' }

        return res.send({ ok: true, result })
      }
      case 'getStarTransactions': {
        let result: StarTransactions

        result = { transactions: [] }

        return res.send({ ok: true, result })
      }
      case 'getStickerSet': {
        let result: StickerSet

        result = {
          name: body?.name,
          sticker_type: '',
          stickers: [
            {
              file_id: '',
              file_unique_id: '',
              height: 0,
              is_animated: false,
              is_video: false,
              type: '',
              width: 0
            }
          ],
          title: ''
        }

        return res.send({ ok: true, result })
      }
      case 'getUpdates': {
        let result: Update[]

        result = [
          {
            message: {
              chat: { id: 0, type: '' },
              date: Date.now(),
              message_id: 0,
              text: generateRandomString()
            },
            update_id: 0
          }
        ]

        return res.send({ ok: true, result })
      }
      case 'getUserChatBoosts': {
        let result: UserChatBoosts

        result = { boosts: [] }

        return res.send({ ok: true, result })
      }
      case 'getUserProfilePhotos': {
        let result: UserProfilePhotos

        result = {
          photos: [
            [
              {
                file_id: '',
                file_unique_id: '',
                height: 0,
                width: 0
              }
            ]
          ],
          total_count: 1
        }

        return res.send({ ok: true, result })
      }
      case 'sendMediaGroup': {
        let result: Message[]

        result = [
          { chat: { id: 0, type: '' }, date: Date.now(), message_id: 0 },
          { chat: { id: 0, type: '' }, date: Date.now(), message_id: 1 }
        ]

        return res.send({ ok: true, result })
      }
      case 'stopPoll': {
        let result: Poll

        result = {
          allows_multiple_answers: false,
          id: '',
          is_anonymous: false,
          is_closed: true,
          options: [],
          question: '',
          total_voter_count: 0,
          type: ''
        }

        return res.send({ ok: true, result })
      }
    }
  })

  url = await app.listen()
  TelegramAPI.setBaseURL(url)
})

afterAll(async () => {
  await app.close()
})
