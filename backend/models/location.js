const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    Country:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    pincode:{
        type:Number,
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model("location", locationSchema);