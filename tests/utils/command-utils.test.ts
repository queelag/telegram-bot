import { describe, expect, it } from 'vitest'
import { getCommand, getCommandByContext } from '../../src/utils/command-utils'

describe('Command Utils', () => {
  it('gets the command from a context', () => {
    expect(getCommandByContext({ caption: '/command' })).toBe('command')
    expect(getCommandByContext({ text: '/command' })).toBe('command')
  })

  it('gets the command from a string', () => {
    expect(getCommand('/command')).toBe('command')
    expect(getCommand('/command_')).toBe('command_')
    expect(getCommand('/command_command')).toBe('command_command')

    expect(getCommand('\n/command')).toBe('command')
    expect(getCommand('/command\n')).toBe('command')
    expect(getCommand('\n/command\n')).toBe('command')

    expect(getCommand('\n/command_')).toBe('command_')
    expect(getCommand('/command_\n')).toBe('command_')
    expect(getCommand('\n/command_\n')).toBe('command_')

    expect(getCommand('\n/command_command')).toBe('command_command')
    expect(getCommand('/command_command\n')).toBe('command_command')
    expect(getCommand('\n/command_command\n')).toBe('command_command')
  })
})
