const {user} = require("../models/usermodel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken")

const redisClient = require("../redishelper/redis")

const {Router}=require("express");

const {authenticator} = require("../middlewares/auth")

const userRouter= Router();

userRouter.post("/signup",async(req,res)=>{
    try {
        
        const {name,email,password} =req.body;
        
        const isUserpresent = await user.findOne({email});

        if(isUserpresent)
        return res.send("user alredy exist, you can login")

        const hash = await bcrypt.hashSync(password,15);

        const newUser = new user({name,email,password:hash})

        await newUser.save();

        res.send("sighnup success")
    } catch (error) {

        res.send(error)
        
    }
})


user.post("/login", async(req,res)=>{
    try {
        
        const {email,password}=req.body;
        const isUserpresent = await user.findOne({email});
        if(!isUserpresent)
        return res.send("user not present go to sighnup please")

        const ispasscorrect = await bcrypt.compareSync(
            password,
            isUserpresent.password
        );

        if(!ispasscorrect) return res.send("please check your password")
        const token = await jwt.sign(
            {userId:isUserpresent._id},
            process.env.jwtsec,
            {expiresIn:"1h"}
        );

        res.send({msg:"Login success",token});
    } catch (error) {
        res.send(error)
        
    }
})


userRouter.get("/logout",authenticator,async(req,res)=>{
    try {
        
        const token = req?.header?.authorization?.split(" ")[1]

        if(!token)
        return res.sendStatus(403)

        await redisClient.set(req.body.userId,token[{EX:60}]);

        res.send("logout success")
    } catch (error) {
        res.send(error)
    }

})

module.exports = {userRouter}