const mongoose = require("mongoose");

const userips = mongoose.Schema({
    userId:{type: mongoose.Types.ObjectId, require:true},
    previoussearches :[{type:String,required:true}]
})

const useriplist = mongoose.model("ip's",userips)

module.exports = {useriplist}