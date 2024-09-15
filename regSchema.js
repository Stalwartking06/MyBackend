const mongoose = require("mongoose");
const reg=mongoose.Schema({
    uname:String,
    upass:String,
    uemail:String,
    umob:String,
})
module.exports=mongoose.model("register",reg)