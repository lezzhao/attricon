import { promises as fs } from 'node:fs'
import { locate } from '@iconify/json'
import type { IconifyJSON } from '@iconify/types'
import collections from '../../../collection.json'

const collectionCache = new Map<string, IconifyJSON>()

export async function getCollection(icon: string): Promise<{
  collection: IconifyJSON
  name: string
} | undefined> {
  const collection = collections.find(collection => icon.startsWith(collection))
  if (!collection)
    return undefined
  try {
    if (!collectionCache.has(collection)) {
      const temp = await fs.readFile(locate(collection), 'utf-8')
      collectionCache.set(collection, JSON.parse(temp))
    }
    return {
      collection: collectionCache.get(collection) as IconifyJSON,
      name: icon.replace(`${collection}-`, ''),
    }
  }
  catch (error) {
    return undefined
  }
}
