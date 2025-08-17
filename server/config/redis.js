const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

// Initialize Redis client
const RedisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

RedisClient.on('error', (err) => console.error('Redis error:', err));
RedisClient.on('connect', () => console.log('Connected to Redis'));

// Connect to Redis
(async () => {
    try {
        await RedisClient.connect();
        console.log('Redis client connected successfully');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
})();

module.exports = RedisClient;