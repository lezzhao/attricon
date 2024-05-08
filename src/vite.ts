import type { Plugin } from 'vite'
import { resetIconInfo, transform } from './transform'

export default function simpleIcons(): Plugin {
  return {
    name: 'vite-plugin-icon',
    buildStart() {
      resetIconInfo()
    },
    async transform(code, id) {
      if (id.includes('node_modules'))
        return
      await transform(code)
    },
  }
}
