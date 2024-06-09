const mongoose = require('mongoose');

const rejectedOrganisationSchema = new mongoose.Schema({
    id:{
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
},{timestamps:true});

module.exports = mongoose.model("rejectedOrganisation", rejectedOrganisationSchema);