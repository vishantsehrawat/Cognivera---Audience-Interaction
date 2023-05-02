const redis = require("redis");

const redisClient = redis.createClient();


redisClient.on("connect", async()=>{
    console.log("connected to redis")
})

redisClient.on("error", async()=>{
    console.log("redis connection error")
})

redisClient.connect();

module.exports ={
    redisClient
}