import type { Plugin } from 'vite'
import { VueScopedPlugin } from './vue-scope'
import AttriconGlobalPlugin from './global'
import type { ViteAttriconConfig } from './types'

export default function Attricon(options?: ViteAttriconConfig): Plugin[] {
  if (options?.mode === 'vue-scope')
    return [VueScopedPlugin(options)]
  else
    return AttriconGlobalPlugin(options)
}

export * from './types'
