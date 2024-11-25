class CacheManager {
  constructor() {
    this.cache = new Map();
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const { value, expiresAt } = entry;
    if (expiresAt && expiresAt < Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return value;
  }

  set(key, value, ttl) {
    const expiresAt = ttl ? Date.now() + ttl : null;
    this.cache.set(key, { value, expiresAt });
  }

  delete(key) {
    this.cache.delete(key);
  }
}

module.exports = new CacheManager();