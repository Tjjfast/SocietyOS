const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL);

async function connectRedis() {
  try {
    const pong = await redis.ping();
    console.log("Redis connected:", pong);
  } catch (err) {
    console.error("Redis connection failed:", err);
    process.exit(1);
  }
}

module.exports = { redis, connectRedis };