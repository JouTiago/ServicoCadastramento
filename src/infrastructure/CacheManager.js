class CacheManager {
    constructor() {
      this.cache = new Map();
    }
  
    get(key) {
      return this.cache.get(key) || null;
    }
  
    set(key, value) {
      this.cache.set(key, value);
    }
  
    remove(key) {
      this.cache.delete(key);
    }
  }
  
  module.exports = new CacheManager();  