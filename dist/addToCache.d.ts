export declare type AddCacheOptions = {
    onProgress?: (value: number) => void;
    onDone?: () => void;
    onError?: (error: any) => void;
};
export declare const addToCache: (cache: Cache, url: string, options?: AddCacheOptions) => Promise<string | void | undefined>;
//# sourceMappingURL=addToCache.d.ts.map