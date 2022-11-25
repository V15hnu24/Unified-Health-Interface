const mongoose = require('mongoose');

const blocked_organisation = new mongoose.Schema({
    organisation_id:{
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

module.exports = mongoose.model("blocked_organisation", blocked_organisation);