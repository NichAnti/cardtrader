import { describe, expect, test } from 'vitest'

import worker from './worker'

const env = {
  ASSETS: {
    fetch: async () => new Response('asset'),
  },
}

const get = (path: string) =>
  worker.fetch(new Request(`https://example.com${path}`), env)

describe('worker', () => {
  test('/api/health returns ok', async () => {
    const response = await get('/api/health')
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
  })

  test.each(['/api', '/api/nope'])('%s returns 404 JSON', async path => {
    const response = await get(path)
    expect(response.status).toBe(404)
    expect(await response.json()).toEqual({ error: 'Not found' })
  })

  test('other paths are served from assets', async () => {
    const response = await get('/some/page')
    expect(await response.text()).toBe('asset')
  })
})
