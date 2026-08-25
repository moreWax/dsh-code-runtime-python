import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { parse } from 'yaml'
import { provide } from '../src/index.js'

describe('bundle manifest', () => {
  it('provides codeRuntime', () => { expect(provide).toContain('codeRuntime') })
  it('disables the stock row and inserts exactly one Python provider', () => {
    const rows = parse(readFileSync('cordis.patch.yml', 'utf8')) as Array<Record<string, unknown>>
    expect(rows).toContainEqual(expect.objectContaining({ id: 'code-runtime', disabled: true }))
    const inserted = rows.flatMap(row => (row.insert ?? []) as Array<{ id: string; name: string }>)
    expect(inserted).toContainEqual(expect.objectContaining({ id: 'code-runtime-python-uv', name: '@morewax/dsh-code-runtime-python' }))
  })
})
