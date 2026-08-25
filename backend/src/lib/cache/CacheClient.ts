export interface CacheClient {
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  get(key: string): Promise<string | null>;
  exists(key: string): Promise<boolean>;
  delete(key: string): Promise<void>;
}
