const redisConfig = require("../config/app.config");
const {createClient} = require("redis");

const { Client } = require('redis-om');

class RedisJSONClient {
    constructor(redisConfig) {
        this.redisConfig = redisConfig;
    }

    async getRedisConnection() {
        return createClient({
            socket: {
                host: redisConfig.host,
                port: redisConfig.port
            },
            password: redisConfig.password
        });
    }

    async getRedisClient() {
        const redis = createClient({
            socket: {
                host: redisConfig.host,
                port: redisConfig.port
            },
            password: redisConfig.password
        });
        await redis.connect();
        const client = await new Client().use(redis);
        return client;
    }
}

module.exports = RedisJSONClient;