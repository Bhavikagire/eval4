const {user} = require("../models/usermodel");

const ipRouter= Router();



const {Router}=require("express");

const {ipvalidator} = require("../middlewares/ipvalidator")
const redisClient = require("../redishelper/redis")
const{limiter}=require("../middlewares/limiter")
const{logger} = require("../middlewares/logger")

const {authenticator} = require("../middlewares/auth")

const axios = require("axios")

const {useriplist} = require("../models/citymodel")


ipRouter.get("/:ip",ipvalidator,limiter,async(req,res)=>{
    try {
        const ip = req.params.ip;
        const isipincache = await redisClient.get(ip);
        if(isipincache) return res.send(isipincache)

        const response = await axious.get(`https://ipapi.co/api/#introduction&q= ${ip}`)

        const citydata = response.data;

        await redisClient.set(ip,JSON.stringify(citydata),{EX:(3600*1000)*6})

        await useriplist.findOneAndUpdate({userId:req.body.userId})

        res.send({data:ipdata})
    } catch (error) {
        res.send(error)
    }
})

module.exports = {ipRouter}
