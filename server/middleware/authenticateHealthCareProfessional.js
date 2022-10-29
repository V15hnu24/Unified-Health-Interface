const jwt =require("jsonwebtoken")
const User =require("../models/HealthCareProfessionalSchema");
//const token =require("../router/auth")
// const cookieParser = require("../router/auth");
const HealthCareProfessionalauthenticate = async(req,res,next) =>{
    try{
       
        console.log("TOken :",req.cookies.jwt);
        const token =req.cookies.jwtoken3;
        console.log("My awesome token" + token);
        const verifyToken =jwt.verify(token, process.env.SECRET_KEY);

        const rootUser =await User.findOne({_id:verifyToken._id, "tokens.token": token});

        if(!rootUser)
        {
            throw new Error('User not Found')
        }
        req.token =token;
        req.rootUser = rootUser;
        req.userID =rootUser._id;

        next();

    }catch(err)
    {
        res.status(401).send('Unauthorized:No token provided');
        console.log("Error");
    }

}

module.exports = HealthCareProfessionalauthenticate;
 