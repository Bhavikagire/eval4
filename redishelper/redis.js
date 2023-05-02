const redis = require("redis");

const redisClient = redis.createClient()

redisClient.on("connect",async()=>{
    console.log("connected to redis");
})

redisClient.on("error",function(err){
    console.log("redis error:",err);
})

redisClient.connect()

module.exports = {redisClient}