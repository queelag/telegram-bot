import { describe, expect, it } from 'vitest'
import {
  getContextChat,
  getContextChatID,
  getContextChatType,
  getContextUser,
  getContextUserFirstName,
  getContextUserID,
  getContextUserLastName,
  getContextUserUsername
} from '../../src/utils/context-utils'

describe('Context Utils', () => {
  it('gets the chat', () => {
    expect(getContextChat({ chat: { id: 1 } } as any)).toStrictEqual({ id: 1 })
    expect(getContextChat({ message: { chat: { id: 1 } } } as any)).toStrictEqual({ id: 1 })
  })

  it('gets the chat id', () => {
    expect(getContextChatID({ chat: { id: 1 } } as any)).toBe(1)
  })

  it('gets the chat type', () => {
    expect(getContextChatType({ chat: { type: 'private' } } as any)).toBe('private')
  })

  it('gets the user', () => {
    expect(getContextUser({ from: { id: 1 } } as any)).toStrictEqual({ id: 1 })
  })

  it('gets the user first name', () => {
    expect(getContextUserFirstName({ from: { first_name: 'John' } } as any)).toBe('John')
  })

  it('gets the user id', () => {
    expect(getContextUserID({ from: { id: 1 } } as any)).toBe(1)
  })

  it('gets the user last name', () => {
    expect(getContextUserLastName({ from: { last_name: 'Doe' } } as any)).toBe('Doe')
  })

  it('gets the user username', () => {
    expect(getContextUserUsername({ from: { username: 'john_doe' } } as any)).toBe('john_doe')
  })
})
