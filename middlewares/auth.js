
const jwt = require("jsonwebtoken");
const { redisClient } = require("../models/citymodel");

// const {redisClient} = require("../redishelper/redis")

const authenticator = async(req,res,next)=>{
    try {
        
        const token = req?.headers?.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).send("log in again")
        }

        const istokenvalid = await jwt.verify(token,process.env.jwtsec);

        if(!istokenvalid)
        res.send("authentication fail login again")

        const istokenblacklisted = await redisClient.get(istokenvalid.userID);

        if(istokenblacklisted)
        return res.send("unauthorized")

        req.body.userID = istokenvalid.userID;
        next();
    } catch (error) {
        res.send("please login ")
    }
}

module.exports = {authenticator}