import { addToCache, AddCacheOptions } from './addToCache'

export default class WebCache {
  constructor(name: string) {
    if (!WebCache.isSupport()) {
      throw new Error('Sorry! your browser does not support web cache.')
    }

    this.name = name
  }

  name: string

  preload(url: string, options?: AddCacheOptions) {
    return caches
      .open(this.name)
      .then(cache => addToCache(cache, url, options))
      .then(blobUrl => {
        blobUrl && console.log(`"${url}" added to [cache@${this.name}]`)
        return blobUrl
      })
  }

  match(url: string, options: AddCacheOptions = {}) {
    return caches
      .open(this.name)
      .then(cache => cache.match(url))
      .then(res => (res ? res.blob() : Promise.resolve(undefined)))
      .then(blob => blob && URL.createObjectURL(blob))
      .then(blobUrl => {
        blobUrl && console.log(`"${url}" found in [cache@${this.name}]`)
        return blobUrl
      })
  }

  matchOrPreload(url: string, options: AddCacheOptions = {}) {
    return this.match(url).then(blobUrl => {
      if (blobUrl) {
        const { onProgress, onDone } = options
        onProgress && onProgress(100)
        onDone && onDone()
        return blobUrl
      } else {
        return this.preload(url, options)
      }
    })
  }

  static isSupport = () =>
    'fetch' in window &&
    'caches' in window &&
    'ReadableStream' in window &&
    'Response' in window
}
