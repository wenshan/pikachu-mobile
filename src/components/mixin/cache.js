// 运行时缓存数据缓存支持
// 既不适合放在props中，也不适合放在state中的数据
const CacheSupport = {
  setCache(k, v) {
    const cacheObj = this.__cacheObj || {};
    cacheObj[k] = v;
    this.__cacheObj = cacheObj;
  },
  getCache(k) {
    const cacheObj = this.__cacheObj;
    return cacheObj ? cacheObj[k] : undefined;
  },
};


module.exports = CacheSupport;
