
const express = require("express");
const app = express()

require("dotenv").config();

const port = process.env.PORT

app.get("/",(req,res)=>{
    res.send("Home route")
})

app.listen(port,()=>{
    try {
        console.log("listening 8030")
    } catch (error) {
        console.log(error)
    }
})