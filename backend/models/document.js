const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    user:{
        type:String
    },
    user_id:{
        type:String
    },
    document_type:{
        type:String
    },
    document:{
        type:String,
        required:true
    },
    // access_to[i].type = user type and access_to[i].id = user id of that particular user type
    access_to:[{user_type:String, user_id:String}]
});

module.exports = mongoose.model("document", documentSchema);