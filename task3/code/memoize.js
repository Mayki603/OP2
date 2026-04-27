function memoize(fn, options = {}) {
    const cache = new Map();
    const { maxSize = Infinity, ttl = 0, eviction = 'LRU', customEvict } = options;

    const evict = () => {
        if (cache.size <= maxSize) return;

        if (eviction === 'custom' && typeof customEvict === 'function') {
            cache.delete(customEvict(cache));
            return;
        }

        if (eviction === 'LFU') {
            let minKey;
            let minFreq = Infinity;
            for (const [key, val] of cache.entries()) {
                if (val.freq < minFreq) {
                    minFreq = val.freq;
                    minKey = key;
                }
            }
            cache.delete(minKey);
            return;
        }

        cache.delete(cache.keys().next().value);
    };

    return function (...args) {
        const key = JSON.stringify(args);
        const now = Date.now();

        if (cache.has(key)) {
            const item = cache.get(key);
            
            if (ttl > 0 && now > item.expiry) {
                cache.delete(key);
            } else {
                item.freq++;
                if (eviction === 'LRU') {
                    cache.delete(key);
                    cache.set(key, item);
                }
                return item.value;
            }
        }

        const result = fn(...args);
        cache.set(key, { value: result, freq: 1, expiry: now + ttl });
        evict();
        
        return result;
    };
}

module.exports = memoize;
