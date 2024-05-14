const AttriconEntryRE = /^(?:virtual:)?attricon(?::.+)?\.css$/
export const AttriconFileRE = /__attricon(_.*?)?\.css(\?.*)?$/

export function resolveAttriconFile(id: string) {
  if (isAttriconFile(id))
    return id
  const match = id.match(AttriconEntryRE)
  if (match) {
    return match[1]
      ? `/__uno_${match[1]}.css`
      : '__attricon.css'
  }
}

export function isAttriconFile(id: string) {
  return Boolean(id.match(AttriconFileRE))
}
