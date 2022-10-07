export function debounce(func: Function, timeout: number) {
  let timer: NodeJS.Timeout
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}

export function throttle(func, timeout) {
  let ready: boolean = true
  return (...args) => {
    if (!ready) {
      return
    }

    ready = false
    func(...args)
    setTimeout(() => {
      ready = true
    }, timeout)
  }
}
