
type WaitForOptions = Partial<{
    delay: number
    duration: number
  }>
  
  export const waitFor = (
    fn: () => boolean,
    { delay = 1e2, duration = 5e3 }: WaitForOptions = {}
  ): Promise<void> =>
    new Promise((resolve, reject) => {
      let timeout: ReturnType<typeof setTimeout>
  
      const timeoutError = new Error('Timeout')
  
      const timeoutID = setTimeout(() => {
        clearTimeout(timeout)
        reject(timeoutError)
      }, duration)
  
      function watch() {
        try {
          if (fn()) {
            clearTimeout(timeoutID)
            resolve()
          } else {
            timeout = setTimeout(watch, delay)
          }
        } catch (err) {
          reject(err)
        }
      }
      watch()
    })
  