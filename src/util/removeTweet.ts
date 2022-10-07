export const removeTweet = (
  element: HTMLDivElement,
  list: string[]
): boolean => {
  if (
    element.nodeName.toLowerCase() === 'article' &&
    list.some((excludeWords) =>
      element.innerText.toLowerCase().includes(excludeWords)
    )
  ) {
    element.parentElement.parentElement.remove()
    return true
  }
  return false
}
