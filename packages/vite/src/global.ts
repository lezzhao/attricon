import type { Plugin, ViteDevServer } from 'vite'
import { Features, transform } from 'lightningcss'
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
      buildStart() {
        tokens.clear()
      },
      resolveId(id) {
        const entry = resolveAttriconFile(id)
        if (entry)
          return entry
      },
      async load(id) {
        if (isAttriconFile(id))
          return `#--attricon--{content: 1}`
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
      async generateBundle(options, bundle) {
        const files = Object.keys(bundle)
          .filter(i => i.endsWith('.css'))

        if (!files.length)
          return

        for (const file of files) {
          const chunk = bundle[file]
          if (chunk.type === 'asset' && typeof chunk.source === 'string') {
            const css = await generator.generate(tokens)
            chunk.source = chunk.source
              .replace(`#--attricon--{content:1}`, optimizeCss(css))
          }
        }
      },

    },
  ]
}

function optimizeCss(
  input: string,
) {
  return transform({
    filename: '',
    // eslint-disable-next-line node/prefer-global/buffer
    code: Buffer.from(input),
    minify: true,
    sourceMap: false,
    drafts: {
      customMedia: true,
    },
    nonStandard: {
      deepSelectorCombinator: true,
    },
    include: Features.Nesting,
    exclude: Features.LogicalProperties,
    targets: {
      safari: (16 << 16) | (4 << 8),
    },
    errorRecovery: true,
  }).code.toString()
}
