import type { FetchError } from '@aracna/core'
import type { DeleteStory, EditStory, PostStory, Story } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function deleteStory(body: DeleteStory, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteStory>('deleteStory', body, config)
}

export async function editStory(body: EditStory, config?: TelegramApiConfig): Promise<Story | FetchError> {
  return TelegramAPI.post<Story, EditStory>('editStory', body, config)
}

export async function postStory(body: PostStory, config?: TelegramApiConfig): Promise<Story | FetchError> {
  return TelegramAPI.post<Story, PostStory>('postStory', body, config)
}
