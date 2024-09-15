const mongoose = require("mongoose");
const sss=mongoose.Schema({
    pid:Number,
    pname:String,
    pprice:Number,
    pdesc:String,
    pcat:String,
    pimage:String
})
module.exports=mongoose.model("product",sss)