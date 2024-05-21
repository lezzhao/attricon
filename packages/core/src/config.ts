import process from 'node:process'
import deepmerge from 'deepmerge'
import { createConfigLoader } from 'unconfig'
import type { AttriconConfig } from './types'

export function defineConfig(config: AttriconConfig): AttriconConfig {
  return config
}

export const DEFAULT_OPTIONS: AttriconConfig = {
  prefix: 'i',
  cwd: process.cwd(),
}

export async function resolveConfig<T extends AttriconConfig>(
  options?: T & { _?: (string | number)[] },
): Promise<T> {
  const defaults = DEFAULT_OPTIONS
  options = options || {} as T
  const loader = createConfigLoader<AttriconConfig>({
    sources: [
      {
        files: [
          'attricon.config',
        ],
        extensions: ['js', 'ts'],
      },
    ],
    cwd: options.cwd || process.cwd(),
    merge: false,
  })

  const config = await loader.load()

  if (!config.sources.length)
    return deepmerge(defaults, options as T) as T

  return deepmerge(deepmerge(defaults, config.config), options as T) as T
}
