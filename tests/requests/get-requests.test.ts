import { FetchError, generateRandomString } from '@aracna/core'
import {
  BotCommand,
  BotDescription,
  BotName,
  BotShortDescription,
  BusinessConnection,
  Chat,
  ChatAdministratorRights,
  ChatMember,
  GameHighScore,
  MenuButton,
  StarTransactions,
  Sticker,
  StickerSet,
  File as TelegramFile,
  Update,
  User,
  UserChatBoosts,
  UserProfilePhotos
} from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { createNewStickerSet } from '../../src/requests/create-requests'
import { deleteStickerSet } from '../../src/requests/delete-requests'
import {
  getBusinessConnection,
  getChat,
  getChatAdministrators,
  getChatMember,
  getChatMemberCount,
  getChatMenuButton,
  getCustomEmojiStickers,
  getFile,
  getForumTopicIconStickers,
  getGameHighScores,
  getMe,
  getMyCommands,
  getMyDefaultAdministratorRights,
  getMyDescription,
  getMyName,
  getMyShortDescription,
  getStarTransactions,
  getStickerSet,
  getUpdates,
  getUserChatBoosts,
  getUserProfilePhotos
} from '../../src/requests/get-requests'
import { BOT_ID, BOT_NAME, GROUP_CHAT_ID, PRIVATE_CHAT_ID, SQUARE_512_WEBP, SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Get Requests', () => {
  it.skip('gets a business connection', async () => {
    let connection: BusinessConnection | FetchError

    connection = await getBusinessConnection({ business_connection_id: '' })
    if (connection instanceof Error) throw connection

    console.log(connection)
  })

  it('gets a chat', async () => {
    let chat: Chat | FetchError

    chat = await getChat({ chat_id: PRIVATE_CHAT_ID })
    if (chat instanceof Error) throw chat

    expect(chat.id).toBe(PRIVATE_CHAT_ID)
  })

  it('gets the chat administrators', async () => {
    let administrators: ChatMember[] | FetchError

    administrators = await getChatAdministrators({ chat_id: GROUP_CHAT_ID })
    if (administrators instanceof Error) throw administrators

    expect(administrators[0].user.id).toBe(PRIVATE_CHAT_ID)
  })

  it('gets a chat member', async () => {
    let member: ChatMember | FetchError

    member = await getChatMember({ chat_id: PRIVATE_CHAT_ID, user_id: PRIVATE_CHAT_ID })
    if (member instanceof Error) throw member

    expect(member.user.id).toBe(PRIVATE_CHAT_ID)
  })

  it('gets the chat member count', async () => {
    let count: number | FetchError

    count = await getChatMemberCount({ chat_id: PRIVATE_CHAT_ID })
    if (count instanceof Error) throw count

    expect(count).toBe(2)
  })

  it('gets the chat menu button', async () => {
    let button: MenuButton | FetchError

    button = await getChatMenuButton({ chat_id: PRIVATE_CHAT_ID })
    if (button instanceof Error) throw button

    expect(button.type).toBe('default')
  })

  it('gets custom emoji stickers', async () => {
    let stickers: Sticker[] | FetchError

    stickers = await getCustomEmojiStickers({ custom_emoji_ids: [] })
    if (stickers instanceof Error) throw stickers

    expect(stickers).toHaveLength(0)
  })

  it.skip('gets a file', async () => {
    let file: TelegramFile | FetchError

    file = await getFile({ file_id: '' })
    if (file instanceof Error) throw file

    console.log(file)
  })

  it('gets the forum topic icon stickers', async () => {
    let stickers: Sticker[] | FetchError

    stickers = await getForumTopicIconStickers()
    if (stickers instanceof Error) throw stickers

    expect(stickers.length).toBeGreaterThan(0)
  })

  it.skip('gets the game high scores', async () => {
    let scores: GameHighScore[] | FetchError

    // needs a message

    scores = await getGameHighScores({ user_id: PRIVATE_CHAT_ID })
    if (scores instanceof Error) throw scores

    console.log(scores)
  })

  it('gets me', async () => {
    let me: User | FetchError

    me = await getMe()
    if (me instanceof Error) throw me

    expect(me.id).toBe(BOT_ID)
  })

  it('gets my commands', async () => {
    let commands: BotCommand[] | FetchError

    commands = await getMyCommands()
    if (commands instanceof Error) throw commands

    expect(commands).toHaveLength(0)
  })

  it('gets my default administrator rights', async () => {
    let rights: ChatAdministratorRights | FetchError

    rights = await getMyDefaultAdministratorRights()
    if (rights instanceof Error) throw rights

    expect(rights).toStrictEqual({
      can_manage_chat: false,
      can_change_info: false,
      can_delete_messages: false,
      can_invite_users: false,
      can_restrict_members: false,
      can_pin_messages: false,
      can_manage_topics: false,
      can_promote_members: false,
      can_manage_video_chats: false,
      can_post_stories: false,
      can_edit_stories: false,
      can_delete_stories: false,
      is_anonymous: false
    })
  })

  it('gets my description', async () => {
    let description: BotDescription | FetchError

    description = await getMyDescription()
    if (description instanceof Error) throw description

    expect(description.description).toBe('')
  })

  it('gets my name', async () => {
    let name: BotName | FetchError

    name = await getMyName()
    if (name instanceof Error) throw name

    expect(name.name).toBe(BOT_NAME)
  })

  it('gets my short description', async () => {
    let description: BotShortDescription | FetchError

    description = await getMyShortDescription()
    if (description instanceof Error) throw description

    expect(description.short_description).toBe('')
  })

  it('gets the star transactions', async () => {
    let transactions: StarTransactions | FetchError

    transactions = await getStarTransactions()
    if (transactions instanceof Error) throw transactions

    expect(transactions.transactions).toHaveLength(0)
  })

  it('gets a sticker set', async () => {
    let name: string, create: boolean | FetchError, set: StickerSet | FetchError

    name = generateRandomString({ prefix: 'A', separator: '_', suffix: `by_${BOT_NAME}` })

    create = await createNewStickerSet({
      name,
      stickers: [
        {
          emoji_list: ['⭐'],
          format: 'static',
          sticker: new File([SQUARE_512_WEBP], 'sticker.png')
        }
      ],
      title: generateRandomString(),
      user_id: PRIVATE_CHAT_ID
    })
    if (create instanceof Error) throw create

    set = await getStickerSet({ name })
    if (set instanceof Error) throw set

    expect(set.name).toBe(name)

    await deleteStickerSet({ name })
  })

  it('gets the updates', async () => {
    let updates: Update[] | FetchError

    updates = await getUpdates({ allowed_updates: [], limit: 0 })
    if (updates instanceof Error) throw updates

    expect(updates).toBeInstanceOf(Array)
  })

  it('gets a user chat boosts', async () => {
    let boosts: UserChatBoosts | FetchError

    boosts = await getUserChatBoosts({ chat_id: SUPER_GROUP_CHAT_ID, user_id: PRIVATE_CHAT_ID })
    if (boosts instanceof Error) throw boosts

    expect(boosts.boosts).toHaveLength(0)
  })

  it('gets a user profile photos', async () => {
    let photos: UserProfilePhotos | FetchError

    photos = await getUserProfilePhotos({ user_id: PRIVATE_CHAT_ID })
    if (photos instanceof Error) throw photos

    expect(photos.total_count).toBeGreaterThan(0)
  })
})
