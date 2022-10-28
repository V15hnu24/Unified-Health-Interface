const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PatientDocumentsLinksSchema = new mongoose.Schema({
    Link1:{
        type:String,
        required:true
    },
   Link2:{
        type:String,
        required:true
   },
    tokens:[
        {
           token:{
             type:String,
             required:true
           }
    }]
})

// We are hasing the password

// We are generating token

PatientDocumentsLinksSchema.methods.generateAuthtoken = async function()
{
    try{
        let token =jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens =this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch{
        console.log(err);
    }
}
// const User = mongoose.model('USER',userSchema)
const PatientDocuments = mongoose.model('PATIENTDOCUMENTSLINKS',PatientDocumentsLinksSchema)
// module.exports = User;
module.exports =PatientDocuments;    // If it open , not able to do patient login