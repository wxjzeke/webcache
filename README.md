# webcache
web cache preload file http request

### Install
```
npm install @ezekiel.wang/webcache
```

### Build
```
npm run build
```

### Usage
```typescript
// types
type AddCacheOptions = {
    onProgress?: (value: number) => void;
    onDone?: () => void;
    onError?: (error: any) => void;
};

class WebCache {
    constructor(name: string);
    name: string;
    preload(url: string, options?: AddCacheOptions): Promise<string | void | undefined>;
    match(url: string, options?: AddCacheOptions): Promise<string | undefined>;
    matchOrPreload(url: string, options?: AddCacheOptions): Promise<string | void | undefined>;
    static isSupport: () => boolean;
}

// example
// WebCache is exported as global (window.WebCache) in browser
import WebCache from '@ezekiel.wang/webcache'

const webcache = new WebCache('app_cache');
webcache.matchOrpreload('http://example.audio.mp3', { onProgress: progress => { console.log(progress) } })
```
