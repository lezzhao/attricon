import { loadIconCss } from './loader'
import { DEFAULT_OPTIONS, resolveConfig } from './config'
import type { AttriconConfig } from './types'

export class AttriconGenerator {
  private tokens = new Set<string>()
  private iconRE: RegExp | undefined
  public config: AttriconConfig | undefined

  constructor(options?: AttriconConfig) {
    this.config = Object.assign(DEFAULT_OPTIONS, options)
    this.iconRE = new RegExp(`\(?\<!\\S\)\(?:["']*\)\(${this.config.prefix}\(?:-\\w+\)+\)`, 'g')
  }

  async scan(code: string, generate?: boolean) {
    const matches = Array.from(code.matchAll(this.iconRE!))
    if (generate)
      return await this.generate(new Set(matches.map(match => (match[1]))))
    return matches.map(match => (match[1]))
  }

  async generate(tokens?: Set<string>) {
    let css = ''
    const _tokens = tokens || this.tokens
    for (const token of _tokens) {
      const str = await loadIconCss(token)
      if (!str)
        continue
      css += str.replace(/[\r\n]/g, '')
    }
    return css
  }
}

export async function createGenerator(options?: AttriconConfig) {
  const config = await resolveConfig(options)
  return new AttriconGenerator(config)
}
