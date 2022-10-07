import type { PlasmoContentScript } from 'plasmo'
import { waitFor } from './util/waitFor'
import { removeTweet } from './util/removeTweet'
import { incrementTweetRemovedCount } from './util/incrementTweetRemovedCount'
import { denyList } from './util/denyList'
;(async () => {
  await waitFor(() => !!document.querySelector('[data-testid="cellInnerDiv"]'))
  Array.from(document.querySelectorAll('[data-testid="cellInnerDiv"]')).forEach(
    (element: HTMLDivElement) => {
      if (removeTweet(element, denyList)) {
        incrementTweetRemovedCount()
      }
    }
  )

  const config = { attributes: true, childList: true, subtree: true }

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(async (mutationList) => {
    for (const mutation of mutationList) {
      if (removeTweet(mutation.target as HTMLDivElement, denyList)) {
        incrementTweetRemovedCount()
      }
    }
  })

  // Start observing the target node for configured mutations
  observer.observe(document.body, config)
})()

export const config: PlasmoContentScript = {
  matches: ['https://*.twitter.com/*'],
  all_frames: true,
}
