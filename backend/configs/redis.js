const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@redis-12073.c305.ap-south-1-1.ec2.cloud.redislabs.com:12073`
});


redisClient.on("connect", async () => {
    console.log("connected to redis")
})

redisClient.on("error", async (err) => {
    console.log(err.message)
    console.log("redis connection error")
})
redisClient.connect();

module.exports = {
    redisClient
}