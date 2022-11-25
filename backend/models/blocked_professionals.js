const mongoose = require('mongoose');

const blocked_professionals = new mongoose.Schema({
    professional_id:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    admin_id:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("blocked_professional", blocked_professionals);