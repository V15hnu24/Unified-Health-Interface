const express =require('express');
const router = express.Router();
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate =require("../middleware/authenticate");
const authenticateOrganization =require("../middleware/authenticateOrganization");
const protect =require("../middleware/protect");
const cookieParser = require('cookie-parser');
router.use(cookieParser());
require('../db/conn');
const User =require("../models/userSchema");
const UserOrganization =require("../models/OrganizationSchema");
router.get('/',(req,res)=>{
    res.send('Hello world from the server router js');
});

//Using Promises
// router.post('/register', (req,res)=>{

//     const { name, email, phone, work, password, cpassword} =req.body;
//     if(!name || !email || !phone || !work || !password ||! cpassword)
//     {
//         return res.status(422).json({error:"Plz filled the field properly."});
//     }

//     User.findOne({email:email}).then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email already exists."});
//         }
//         const user = new User({name, email, phone, work, password, cpassword})

//         user.save().then(()=>{
//             res.status(201).json({message:"User registered successfully."})
//         }).catch((err)=>res.status(500).json({error:"Failed to registered"}));
//     }).catch(err=>{console.log(err);});
// })

// Patient Register 
router.post('/register', async (req,res)=>{

    const { name, email, phone,work,gender,dob,pincode, password, cpassword} =req.body;
    if(!name || !email || !phone || !gender || !dob || !pincode || !work || !password ||! cpassword)
    {
        return res.status(422).json({error:"Plz filled the field properly."});
    }
    try{
        const userExist =await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"Email already exists."});
        }
        else  if(password!=cpassword)
        {
         res.status(422).json({message:"Password are not matching."})
        }
        else{
            const user = new User({name, email, phone, work,gender,dob,pincode, password, cpassword})

            //Hashing before saving in the databse
    
            const userRegister =  await user.save();
            if(userRegister)
            {
                res.status(201).json({message:"User registered successfully."})
            }else{
                res.status(500).json({error:"Failed to registered"});
            }
        }
    }catch(err)
    {
        console.log(err);
    }
})
// Organization Router Register
router.post('/registerOrganization', async (req,res)=>{

    const { name, email, phone,work,pincode, password, cpassword} =req.body;
    if(!name || !email || !phone  || !pincode || !work || !password ||! cpassword)
    {
        return res.status(422).json({error:"Plz filled the field properly."});
    }
    try{
        const userExist =await UserOrganization.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"Email already exists."});
        }
        else  if(password!=cpassword)
        {
         res.status(422).json({message:"Password are not matching."})
        }
        else{
            const user = new UserOrganization({name, email, phone, work,pincode, password, cpassword})

            //Hashing before saving in the databse
    
            const userRegister =  await user.save();
            if(userRegister)
            {
                res.status(201).json({message:"User registered successfully."})
            }else{
                res.status(500).json({error:"Failed to registered"});
            }
        }
    }catch(err)
    {
        console.log(err);
    }
})
//login route Patient

router.post('/signin',async (req,res)=>{
//   console.log(req.body);
//   res.json({message:"awesome"});

 try{
    let token;
    const{email,password} = req.body;

    if(! email || !password)
    {
        return res.status(400).json({error:"Plz Filled the data."})
    }
    const userLogin = await User.findOne({email:email});
    //console.log(userLogin);
    //console.log(token);

    // res.cookie("jwt",token=>{
    //     expires:new Date(Date.now()+ 2589200000000000)
    //     httpOnly:true
    // });

    if(userLogin)
    {
        const isMatch =await bcrypt.compare(password,userLogin.password);

        token = await userLogin.generateAuthtoken();
        res.cookie("jwtoken",token,{
            expires:new Date(Date.now()+ 2589200000000000),
            httpOnly:true
        });
        console.log("Hello My token name is:",token);
        if(!isMatch){
        res.json({error:"Invalid Credentials"});
        }else{
            res.json({message:"user Signin Sucessfully."});
        }
    }else{
        res.status(400).json({error:"Invalid Credentials"});
    }
 }catch(err)
 {
    console.log(err);
 }
})

//login route Organization

router.post('/signinOrganization',async (req,res)=>{
    //   console.log(req.body);
    //   res.json({message:"awesome"});
    
     try{
        let token2;
        const{email,password} = req.body;
    
        if(! email || !password)
        {
            return res.status(400).json({error:"Plz Filled the data."})
        }
        const userLogin = await UserOrganization.findOne({email:email});
        //console.log(userLogin);
        //console.log(token);
    
        // res.cookie("jwt",token=>{
        //     expires:new Date(Date.now()+ 2589200000000000)
        //     httpOnly:true
        // });
    
        if(userLogin)
        {
            const isMatch =await bcrypt.compare(password,userLogin.password);
    
            token2 = await userLogin.generateAuthtoken();  // Userschema jwt not Organization jwt
            res.cookie("jwtoken2",token2,{
                expires:new Date(Date.now()+ 2589200000000000),
                httpOnly:true
            });
            console.log("Hello My token name 2 is:",token2);
            if(!isMatch){
            res.json({error:"Invalid Credentials"});
            }else{
                res.json({message:"user Signin Sucessfully."});
            }
        }else{
            res.status(400).json({error:"Invalid Credentials"});
        }
     }catch(err)
     {
        console.log(err);
     }
    })




// About Us page of Patient
router.get('/about',authenticate,(req,res)=>{
    //res.send(`Hello World my About`);
    res.send(req.rootUser);
});

// Get Information from User Home Page of Patient
router.get('/getdata',authenticate,(req,res)=>{
    console.log("Hello My User's Data");
    res.send(req.rootUser);
})

// Get Information from User Home Page of Organization
router.get('/getdataOrganization',authenticateOrganization,(req,res)=>{
    console.log("Hello My Organization's Data");
    res.send(req.rootUser);
})


// Edit Details of Patient
router.post('/Editdetails',authenticate,async(req,res)=>{
     
    try{

        const {name, email, phone, work,gender,dob,pincode} = req.body;
        console.log(name);
        console.log(email);
        console.log(phone);
        console.log(work);
        console.log(gender);
        console.log(dob);
        console.log(pincode);
        if(!name || !email || !phone || !work || !gender || !dob || !pincode)
        {
            console.log("Error in Updation");
            return res.json("Plz filled the Updation form.");
        }

        const userUpdate =await User.findOne({_id: req.userID});
        console.log(userUpdate);
        var newvalues = { $set: { name: name, email:email, phone:phone,gender:gender,work:work,dob:dob,pincode:pincode} };
        if(userUpdate)
        {
            try{
            const result = await User.updateOne({_id:req.userID},{
                $set :{
                    name: name, email:email, phone:phone,gender:gender,work:work,dob:dob,pincode:pincode
                }
                });
                console.log(result);
              
        }catch(err){
            console.log("Error in Updating");
        }
    //    await userUpdate.save();
       await result.save();
    }
    await userUpdate.save();
    }catch(error){
        console.log("Error in Updating.");
        res.status(400).json({error:"Error in Updating"});
    }
});

// Logout Page of Patient
router.get('/logout',(req,res)=>{
    console.log("Hello My Logout Page");
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send('User Logout');
})
// router.post('/Editdetails',protect,(req,res)=>{

//     const rootUser =req.body;
//     res.send(rootUser);
      
// });

// router.get('/about',(req,res)=>{
//     //res.send(`Hello World my About`);
//     res.send(req.rootUser);
// });
//console.log("Hello token",token.jwt);


module.exports =router;