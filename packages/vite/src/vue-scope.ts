import type { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import { AttriconGenerator } from '@attricon/core'
import MagicString from 'magic-string'

export function VueScopedPlugin(): Plugin {
  const filter = createFilter([/\.vue$/])
  const attricon = new AttriconGenerator({ prefix: 'i-' })

  async function transformSFC(code: string) {
    const css = await attricon.scan(code, true)
    if (!css)
      return null
    return `${code}\n<style scoped>${css}</style>`
  }

  return {
    name: 'attricon:vue-scoped',
    enforce: 'pre',
    apply: 'build',
    transform(code, id) {
      if (id.endsWith('main.ts')) {
        const s = new MagicString(code)
        s.replace(/import\s*['"]_{0,2}attricon(_.*?)?\.css(\?.*)?['"]/, '')
        return {
          code: s.toString(),
          map: s.generateMap(),
        }
      }
      if (!filter(id) || !id.endsWith('.vue'))
        return
      return transformSFC(code)
    },
    handleHotUpdate(ctx) {
      const read = ctx.read
      if (filter(ctx.file)) {
        ctx.read = async () => {
          const code = await read()
          return await transformSFC(code) || code
        }
      }
    },
  }
}
