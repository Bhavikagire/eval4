const winston = require("winston")

const {mongoDb} =require("winston-mongodb")

const logger = winston.createLogger({

    level:"error",
    transports:[
        new mongoDb({
            db:process.env.mongourl,
            collection:"errors",
            options:{useUnifiedTopology:true}
        })
    ]
});


module.exports = {logger}