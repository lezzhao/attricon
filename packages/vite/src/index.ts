import type { Plugin } from 'vite'
import AttriconDevPlugin from './dev'
import { VueScopedPlugin } from './vue-scope'

export default function Attricon(): Plugin[] {
  const plugins = [...AttriconDevPlugin()]

  plugins.push(VueScopedPlugin())

  return plugins
}
