import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.cacheManager.set(key, value, { ttl: ttlSeconds });
      return;
    }

    await this.cacheManager.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    const value = await this.cacheManager.get<string>(key);
    return value ?? null;
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
