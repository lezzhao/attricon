import type { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import { AttriconGenerator } from '@attricon/core'

export function VueScopedPlugin(): Plugin {
  const filter = createFilter([/\.vue$/])
  const attricon = new AttriconGenerator({ prefix: 'i-' })

  async function transformSFC(code: string) {
    const css = await attricon.scan(code, true)
    if (!css)
      return null
    return `${code}\n<style scoped>\n${css}\n</style>`
  }

  return {
    name: 'attricon:vue-scoped',
    enforce: 'pre',
    transform(code, id) {
      if (!filter(id) || !id.endsWith('.vue'))
        return
      return transformSFC(code)
    },
    handleHotUpdate({ server, modules, timestamp }) {
      // Also use `server.ws.send` to support Vite <5.1 if needed
      server.hot.send({ type: 'full-reload' })
      // Invalidate modules manually
      const invalidatedModules: any = new Set()
      for (const mod of modules) {
        server.moduleGraph.invalidateModule(
          mod,
          invalidatedModules,
          timestamp,
          true,
        )
      }
      return []
    },
  }
}
