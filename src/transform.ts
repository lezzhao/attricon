import { loadIconCss } from './loader'

export const iconInfo = {
  accessed: new Set<string>(),
  iconCss: '',
}

function generateRE(prefix: string) {
  return new RegExp(`\(?\<!\\S\)\(?:["']*\)\(${prefix}\(-\\w+\)+\)`, 'g')
}

export async function transform(code: string) {
  let cssStr = ''
  const RE = generateRE('i')
  const _matches = Array.from(code.matchAll(RE))
  if (_matches.length === 0)
    return
  const matches = Array.from(new Set(_matches))

  for (const match of matches) {
    if (iconInfo.accessed.has(match[1]))
      continue
    const str = await loadIconCss(match[1])
    const temp = str?.replace(/[\s\r\n]/g, '')
    iconInfo.accessed.add(match[1])
    cssStr += temp
  }
  iconInfo.iconCss += cssStr

  return iconInfo
}

export function resetIconInfo() {
  iconInfo.accessed.clear()
  iconInfo.iconCss = ''
}
