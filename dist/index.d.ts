import { AddCacheOptions } from './addToCache';
export default class WebCache {
    constructor(name: string);
    name: string;
    preload(url: string, options?: AddCacheOptions): Promise<string | void | undefined>;
    match(url: string, options?: AddCacheOptions): Promise<string | undefined>;
    matchOrPreload(url: string, options?: AddCacheOptions): Promise<string | void | undefined>;
    static isSupport: () => boolean;
}
//# sourceMappingURL=index.d.ts.map