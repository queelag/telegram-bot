import { describe, expect, it } from 'vitest'
import { getProgressHTML, sanitizeHTML } from '../../src/utils/html-utils'

describe('HTML Utils', () => {
  it('gets the progress in HTML', () => {
    expect(getProgressHTML(50)).toBe('<code>[==========          ]</code>')
    expect(getProgressHTML(50, 25, 50)).toBe('<code>[====================]</code>')
    expect(getProgressHTML(50, 0, 100, 10)).toBe('<code>[=====     ]</code>')
  })

  it('sanitizes the HTML', () => {
    expect(sanitizeHTML('<b>bold</b>')).toBe('<b>bold</b>')
    expect(sanitizeHTML('<strong>strong</strong>')).toBe('<strong>strong</strong>')
    expect(sanitizeHTML('<i>italic</i>')).toBe('<i>italic</i>')
    expect(sanitizeHTML('<em>emphasis</em>')).toBe('<em>emphasis</em>')
    expect(sanitizeHTML('<u>underline</u>')).toBe('<u>underline</u>')
    expect(sanitizeHTML('<ins>insert</ins>')).toBe('<ins>insert</ins>')
    expect(sanitizeHTML('<s>strikethrough</s>')).toBe('<s>strikethrough</s>')
    expect(sanitizeHTML('<strike>strike</strike>')).toBe('<strike>strike</strike>')
    expect(sanitizeHTML('<del>delete</del>')).toBe('<del>delete</del>')
    expect(sanitizeHTML('<span>span</span>')).toBe('<span>span</span>')
    expect(sanitizeHTML('<tg-spoiler>spoiler</tg-spoiler>')).toBe('<tg-spoiler>spoiler</tg-spoiler>')
    expect(sanitizeHTML('<a href="https://example.com">link</a>')).toBe('<a href="https://example.com">link</a>')
    expect(sanitizeHTML('<code>code</code>')).toBe('<code>code</code>')
    expect(sanitizeHTML('<pre>preformatted</pre>')).toBe('<pre>preformatted</pre>')
    expect(sanitizeHTML('</>')).toBe('</>')
    expect(sanitizeHTML('<">')).toBe('<">')

    expect(sanitizeHTML('<<')).toBe('&lt;&lt;')
    expect(sanitizeHTML('<')).toBe('&lt;')
    expect(sanitizeHTML('<>')).toBe('&lt;&gt;')
    expect(sanitizeHTML('>')).toBe('&gt;')
    expect(sanitizeHTML('>>')).toBe('&gt;&gt;')

    expect(sanitizeHTML('&')).toBe('&amp;')
    expect(sanitizeHTML('&&')).toBe('&amp;&amp;')
  })
})
