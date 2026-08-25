import Redis from "ioredis";

const host = process.env.REDIS_HOST || "localhost";
const port = Number(process.env.REDIS_PORT) || 6379;
const password = process.env.REDIS_PASSWORD || "";

const redis = new Redis({
  host,
  port,
  password,
});

redis.on("connect", () => {
  console.log("Redis Connected");
});
redis.on("error", (e) => {
  console.log(`Error on Redis: ${e}`);
});

export default redis;
