import type { AttriconConfig } from '@attricon/core'

export interface ViteAttriconConfig extends AttriconConfig {
  /**
   * pack mode
   * @default 'global'
   */
  mode?: 'vue-scope' | 'global'
}
