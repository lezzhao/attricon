import type { FigmaImportOptions } from '@iconify/tools/lib/import/figma/types/options.js'
import type { IconifyJSON } from '@iconify/types'

export interface AttriconConfig {
  /**
   * custom prefix
   * @default 'i'
   */
  prefix?: string
  /**
   * custom icon config, support dir or figma
   */
  custom?: string | FigmaImportOptions
  /**
   * current working directory
   * @default  process.cwd()
   */
  cwd?: string
}

export type CollectionInfo = {
  collection: IconifyJSON
  name: string
} | undefined
