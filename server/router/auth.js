const express =require('express');
const router = express.Router();
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate =require("../middleware/authenticate");
const protect =require("../middleware/protect");
const cookieParser = require('cookie-parser');
router.use(cookieParser());
require('../db/conn');
const User =require("../models/userSchema");
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
//login route

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

// router.use(cookieParser());
// About Us page
router.get('/about',authenticate,(req,res)=>{
    //res.send(`Hello World my About`);
    res.send(req.rootUser);
});
router.post('/Editdetails',protect,(req,res)=>{

    const rootUser =req.body;
    res.send(rootUser);
      
});

// router.get('/about',(req,res)=>{
//     //res.send(`Hello World my About`);
//     res.send(req.rootUser);
// });
//console.log("Hello token",token.jwt);


module.exports =router;