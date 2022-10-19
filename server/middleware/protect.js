
const User =require("../models/userSchema");

const protect = async(req,res,next)=>{

    // const rootUser =await User.findOne({_id:verifyToken._id, "tokens.token": token});
    const rootUser =await User.findOne({_id:User._id});
    console.log(rootUser.name);

    if(rootUser)
    {
        rootUser.name =req.body.name || rootUser.name;
        rootUser.email =req.body.email || rootUser.email;
        rootUser.phone=req.body.phone || rootUser.phone;
        rootUser.work =req.body.work || rootUser.work;
        rootUser.gender =req.body.gender || rootUser.gender;
        rootUser.pincode =req.body.pincode || rootUser.pincode;
        
        if(req.body.password){
            user.password =req.body.password || user.password;
        }
        const updatedUser =await user.save();

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            phone:updatedUser.phone,
            work:updatedUser.work,
            gender:updatedUser.gender,
            pincode:updatedUser.pincode,
            token: generateAuthtoken(updatedUser._id),
        });
        next();
    }
        else{
            res.status(404);
            throw new Error("User not found !");
        }
}


module.exports = protect;