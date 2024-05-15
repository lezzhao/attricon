import type { Plugin } from 'vite'
import { VueScopedPlugin } from './vue-scope'
import AttriconGlobalPlugin from './global'

export default function Attricon(): Plugin[] {
  if (Math.random() > 0.5)
    return AttriconGlobalPlugin()
  else
    return [VueScopedPlugin()]
}
