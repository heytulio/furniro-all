import { CacheClient } from "./CacheClient";
import redis from "../redis";

export class RedisCacheClient implements CacheClient {
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds && ttlSeconds > 0) {
      await redis.set(key, value, "EX", ttlSeconds);
    } else {
      await redis.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return redis.get(key);
  }

  async exists(key: string): Promise<boolean> {
    const count = await redis.exists(key);
    return count === 1;
  }

  async delete(key: string): Promise<void> {
    await redis.del(key);
  }
}
