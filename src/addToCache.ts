export type AddCacheOptions = {
  onProgress?: (value: number) => void
  onDone?: () => void
  onError?: (error: any) => void
}

export const addToCache = (
  cache: Cache,
  url: string,
  options: AddCacheOptions = {}
) => {
  const { onProgress, onDone, onError } = options

  return fetch(url)
    .then(res => {
      const contentLength = res.headers.get('content-length')
      if (!contentLength) {
        return
      }
      if (!res.body) {
        return
      }

      let loaded = 0
      const total = parseInt(contentLength, 10)
      const reader = res.body.getReader()
      const stream = new ReadableStream({
        start(controller) {
          const read = () => {
            reader
              .read()
              .then(({ done, value }) => {
                if (done) {
                  console.log('reader done')
                  controller.close()
                  onDone && onDone()
                  return
                }
                controller.enqueue(value)
                loaded += value.byteLength

                onProgress && onProgress(Math.round((loaded / total) * 100))
                read()
              })
              .catch(error => {
                console.error(error)
                controller.error(error)
                onError && onError(error)
              })
          }
          read()
        }
      })
      const response = new Response(stream, { headers: res.headers })

      return cache
        .put(url, response.clone()) // response can only use once
        .then(() => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .catch(console.error)
    })
    .catch(function(error) {
      onError && onError(error)
    })
}
