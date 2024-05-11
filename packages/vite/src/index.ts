import { createHash } from 'node:crypto'
import type { Plugin, ViteDevServer } from 'vite'
import MagicString from 'magic-string'
import { AttriconGenerator } from '@attricon/core'

export function getHash(input: string, length = 6) {
  return createHash('sha256')
    .update(input)
    .digest('hex')
    .slice(0, length)
}

const HOT_EVENT_PREFIX = 'icon:hmr'

export default function simpleIcons(): Plugin[] {
  const generator = new AttriconGenerator({ prefix: 'i-' })
  let server: ViteDevServer | undefined
  const tokens = new Set<string>()
  let cache = new Set<string>()
  let hash = ''
  let virtualId: any
  return [
    {
      name: 'simpleicon:dev',
      enforce: 'pre',
      apply: 'serve',
      async configureServer(s) {
        server = s
      },
      async transform(code, id) {
        if (id.includes('/.vite/'))
          return
        const token = await generator.scan(code)
        if (Array.isArray(token))
          token.forEach(t => tokens.add(t))
      },
      resolveId(id) {
        if (id.includes('sicon.css'))
          return id
      },
      async load(id) {
        if (id.includes('sicon.css')) {
          virtualId = id
          const css = await generator.generate(tokens)
          if (css) {
            hash = getHash(css)
            cache = new Set(Array.from(tokens))
            return {
              code: `${css}__icon_hash_${hash}{--:'';}`,
              map: { mappings: '' },
            }
          }
        }
      },
    },
    {
      name: 'simpleicon:dev1',
      enforce: 'post',
      apply: 'serve',
      async transform(code, id, options) {
        if (cache.size && tokens.size !== cache.size) {
          if (virtualId) {
            const css = await generator.generate(tokens)
            hash = getHash(css)
            cache = new Set(Array.from(tokens))
            const mod = await server!.moduleGraph.getModuleById(virtualId)
            if (mod) {
              await server?.moduleGraph.updateModuleTransformResult(mod, {
                code: `${css}__icon_hash_${hash}{--:'';}`,
                map: { mappings: '' },
              }, options?.ssr || false)
              server?.reloadModule(mod)
            }
          }
        }

        // inject css modules to send callback on css load
        if (code.includes('import.meta.hot') && id.endsWith('sicon.css')) {
          let hmr = `
            try {
            let hash = __vite__css.match(/__icon_hash_(\\w{6})/)
            hash = hash && hash[1]
            if (!hash)
                console.warn('[icon-hmr]', 'failed to get icon hash, hmr might not work')
            else
                await import.meta.hot.send('${HOT_EVENT_PREFIX}', ['${id}']);
            } catch (e) {
            console.warn('[icon-hmr]', e)
            }`

          hmr = `;(async function() {${hmr}\n})()`

          const s = new MagicString(code)
          s.append(hmr)

          return {
            code: s.toString(),
            map: s.generateMap() as any,
          }
        }
      },
    },
  ]
}
