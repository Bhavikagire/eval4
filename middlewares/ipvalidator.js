
const ipvalidator = (req,res,next)=>{
    const ip = req.params.ip

    let regex = /((([0-9a-fA-F]){1,4})\:){7}([0-9a-fA-F]){1,4}/

    if(regex.test(ip)){
        next()
    }
    else{
        res.send("please provide valid ip")
    }
}

module.exports = {ipvalidator}