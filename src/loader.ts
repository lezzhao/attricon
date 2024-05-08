import { getIconCSS, getIconData } from '@iconify/utils'
import { getCollection } from './collection'

const cssCache = new Map<string, string>()

export async function loadIconCss(name: string) {
  const prefix = 'i-'
  if (cssCache.has(name))
    return cssCache.get(name)
  const iconInfo = await getCollection(name.replace(prefix, ''))
  if (!iconInfo)
    return
  const icon = await getIconData(iconInfo.collection, iconInfo.name)
  let cssText = await getIconCSS(icon!)
  cssText = cssText.replace('.icon', `[${name}=""]`)
  cssCache.set(name, cssText)
  return cssText
}
