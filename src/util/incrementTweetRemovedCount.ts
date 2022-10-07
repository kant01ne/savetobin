import { Storage } from '@plasmohq/storage'
import { throttle } from './throttle'
const storage = new Storage()
const storageKey = 'deletedTweetsCount'
let deletedTweetsCount: number = 0

export const incrementTweetRemovedCount = async () => {
  deletedTweetsCount =
    deletedTweetsCount || parseInt(await storage.get(storageKey)) || 0

  deletedTweetsCount += 1
  increment(deletedTweetsCount)
}

const increment = throttle((count) => {
  storage.set(storageKey, count)
}, 1000)
