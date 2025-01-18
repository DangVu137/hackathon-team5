export const waitTxnUntilDone = (fn: () => Promise<any>, time = 1000, limit = 60) => {
  const now = Date.now() / 1000 // in seconds

  return new Promise((resolve, reject) => {
    const timer = setInterval(async () => {
      try {
        const isExpired = Date.now() / 1000 - now >= limit

        if (isExpired) {
          timer && clearInterval(timer)
          reject('Timeout')
        }
        const response = await fn()

        if (response) {
          clearInterval(timer)
          resolve(response)
        }
      } catch (error) {
        clearInterval(timer)
        console.error(error)
      }
    }, time)
  })
}
