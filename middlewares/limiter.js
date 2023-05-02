const addlimit = require("express-rate-limit")

const limiter = addlimit({
    windowMs:6*60*1000,
    standardHeaders:true,
    legacyHEaders:false,
});

module.exports={limiter}