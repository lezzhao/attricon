import type { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'

export function VueScopedPlugin(): Plugin {
  const filter = createFilter([/\.vue$/])

  async function transformSFC(code: string) {
    // const { css } = await uno.generate(code)
    // if (!css)
    //   return null
    return `${code}\n<style scoped>${''}</style>`
  }

  return {
    name: 'unocss:vue-scoped',
    enforce: 'pre',
    transform(code, id) {
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
