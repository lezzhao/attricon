import type { Plugin, ViteDevServer } from 'vite'
import { AttriconGenerator } from '@attricon/core'
import { isAttriconFile, resolveAttriconFile } from './utils'

export default function AttriconGlobalPlugin(): Plugin[] {
  let server: ViteDevServer | undefined
  const generator = new AttriconGenerator({ prefix: 'i-' })
  const tokens = new Set<string>()
  let cache = new Set<string>()

  const cssModule = new Set<string>()
  return [
    {
      name: 'attricon:scan',
      apply: 'serve',
      async configureServer(s) {
        server = s
      },
      resolveId(id) {
        const entry = resolveAttriconFile(id)
        if (entry)
          return entry
      },
      async load(id) {
        if (isAttriconFile(id)) {
          cssModule.add(id)
          const css = await generator.generate(tokens)
          if (css) {
            cache = new Set(Array.from(tokens))
            return {
              code: css,
              map: { mappings: '' },
            }
          }
        }
      },
      async transformIndexHtml(html) {
        const token = await generator.scan(html)
        if (Array.isArray(token))
          token.forEach(t => tokens.add(t))
      },
      async transform(code, id) {
        if (id.includes('/.vite/'))
          return
        const token = await generator.scan(code)
        if (Array.isArray(token))
          token.forEach(t => tokens.add(t))
      },
    },
    {
      name: 'attricon:hmr',
      enforce: 'post',
      apply: 'serve',
      async transform(_code, _id, options) {
        if (cache.size && tokens.size !== cache.size) {
          for (const id of cssModule) {
            const css = await generator.generate(tokens)
            cache = new Set(Array.from(tokens))
            const mod = await server!.moduleGraph.getModuleById(id)
            if (mod) {
              await server?.moduleGraph.updateModuleTransformResult(mod, {
                code: css,
                map: { mappings: '' },
              }, options?.ssr || false)
              server?.reloadModule(mod)
            }
          }
        }
      },
    },
    {
      name: 'attricon:build',
      apply: 'build',
    },
  ]
}
