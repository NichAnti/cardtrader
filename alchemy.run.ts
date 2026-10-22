import * as Alchemy from 'alchemy'
import * as Cloudflare from 'alchemy/Cloudflare'
import * as Effect from 'effect/Effect'

export const Website = Cloudflare.Website.Foldkit('Website', {
  main: 'src/worker.ts',
  assets: {
    runWorkerFirst: ['/api', '/api/*'],
  },
})

export default Alchemy.Stack(
  'Cardtrader',
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const worker = yield* Website

    return {
      url: worker.url,
    }
  }),
)
