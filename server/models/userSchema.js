const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        reuired:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
           token:{
             type:String,
             required:true
           }
    }
]

})
const OrganizationSchema = new mongoose.Schema({
    name:{
        type:String,
        reuired:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
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

userSchema.pre('save',async function(next){
   // console.log("Hi from inside");
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword =await bcrypt.hash(this.cpassword,12);
    }
    next();
})
// We are hasing the password

OrganizationSchema.pre('save',async function(next){
    // console.log("Hi from inside");
     if(this.isModified('password'))
     {
         this.password = await bcrypt.hash(this.password,12);
         this.cpassword =await bcrypt.hash(this.cpassword,12);
     }
     next();
 })
// We are generating token

userSchema.methods.generateAuthtoken = async function()
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
// We are generating token

OrganizationSchema.methods.generateAuthtoken = async function()
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
const User = mongoose.model('USER',userSchema)
// const Organization = mongoose.model('ORGANIZATION',OrganizationSchema)
module.exports = User;
// module.exports =Organization;    // If it open , not able to do patient login