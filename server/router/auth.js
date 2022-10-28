const express =require('express');
const router = express.Router();
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate =require("../middleware/authenticate");
// const { patient_login, patient_register,patient_Home, admin_login,admin_register } = require('../controllers/auth');
const authenticateOrganization =require("../middleware/authenticateOrganization");
const authenticateHealthCareProfessional =require("../middleware/authenticateHealthCareProfessional");
const protect =require("../middleware/protect");
const cookieParser = require('cookie-parser');
router.use(cookieParser());
require('../db/conn');
const User =require("../models/userSchema");
const UserOrganization =require("../models/OrganizationSchema");
const HealthCareProfessional =require("../models/HealthCareProfessionalSchema");
const PatientDocuments = require('../models/PatientDocumentsLinksSchema');
// const PaytmChecksum = require('../PaytmChecksum');
// require('dotenv').config({path:'../env'})
// const {v4 :uuidv4}=require('uuid');
const crypto =require("crypto");

const Razorpay = require('razorpay');
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

    const { name, email, mobile,country,gender,state,city,dob,pincode, password,cpassword} =req.body;
    if(!name || !email || !mobile ||!country|| !gender || !state|| !city|| !dob || !pincode || !password ||!cpassword)
    {
        return res.status(422).json({error:"Plz filled the field properly."});
    }
    try{
        const userExist =await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"Email already exists."});
        }
        // else  if(password!=cpassword)
        // {
        //  res.status(422).json({message:"Password are not matching."})
        // }
        else{
            const user = new User({name, email, mobile,country,gender,state,city,dob,pincode, password,cpassword})

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

    const { name, email, phone,work,location,pincode, password, cpassword} =req.body;
    if(!name || !email || !phone  || !pincode || !work || !location || !password ||! cpassword)
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
            const user = new UserOrganization({name, email, phone, work,location,location,pincode, password, cpassword})

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
// HealthCareProfessional Register
router.post('/HealthCareProfessionalRegister', async (req,res)=>{

    const { name, email, phone,work,gender,dob,location,pincode, password, cpassword} =req.body;
    if(!name || !email || !phone  || !pincode ||!gender ||!dob || !work || !location || !password ||! cpassword)
    {
        return res.status(422).json({error:"Plz filled the field properly."});
    }
    try{
        const userExist =await HealthCareProfessional.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"Email already exists."});
        }
        else  if(password!=cpassword)
        {
         res.status(422).json({message:"Password are not matching."})
        }
        else{
            const user = new HealthCareProfessional({name, email, phone, work,gender,dob,location,location,pincode, password, cpassword})

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
    console.log("Error");
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


//login route HealthCareProfessional

router.post('/HealthCareProfessionalLogin',async (req,res)=>{
    //   console.log(req.body);
    //   res.json({message:"awesome"});
    
     try{
        let token3;
        const{email,password} = req.body;
    
        if(! email || !password)
        {
            return res.status(400).json({error:"Plz Filled the data."})
        }
        const userLogin = await HealthCareProfessional.findOne({email:email});
        //console.log(userLogin);
        //console.log(token);
    
        // res.cookie("jwt",token=>{
        //     expires:new Date(Date.now()+ 2589200000000000)
        //     httpOnly:true
        // });
    
        if(userLogin)
        {
            const isMatch =await bcrypt.compare(password,userLogin.password);
    
            token3 = await userLogin.generateAuthtoken();  // Userschema jwt not Organization jwt
            res.cookie("jwtoken3",token3,{
                expires:new Date(Date.now()+ 2589200000000000),
                httpOnly:true
            });
            console.log("Hello My token name 2 is:",token3);
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

// PatientDocumentsLinks
    router.post('/PatientDocuments',async (req,res)=>{
        //   console.log(req.body);
        //   res.json({message:"awesome"});
        
         try{
            let token;
            const{Link1,Link2} = req.body;
        
            if(! Link1 || !Link2)
            {
                return res.status(400).json({error:"Plz Filled the data."})
            }
            const userLogin = await PatientDocuments.findOne({Link1:Link1});
            //console.log(userLogin);
            //console.log(token);
        
            // res.cookie("jwt",token=>{
            //     expires:new Date(Date.now()+ 2589200000000000)
            //     httpOnly:true
            // });
            if(userLogin){
                return res.status(422).json({error:"Link already exists."});
            }
            else{
                const user = new PatientDocuments({Link1,Link2})
    
                //Hashing before saving in the databse
                console.log(Link1);
                console.log(Link2);
                const userRegister =  await user.save();
                if(userRegister)
                {
                    res.status(201).json({message:"Link registered successfully."})
                }else{
                    res.status(500).json({error:"Failed to registered"});
                }
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
router.get('/getdataOrganization',async (req,res)=>{
    console.log("Hello My Organization's Data");
    // var cursor = UserOrganization.collection().find();
    // console.log(cursor);
    var resultArray = [];
    const filter = {};
    const all = await UserOrganization.find(filter);
    console.log(all);
    res.send(all);
   
    await User.find();
    // const data = UserOrganization.find({}).then(
    //     name =>res.json(name)
    // );
    // console.log(data);
    // res.send(req.rootUser);
    // let payload = req.body.payload.trim();
    // console.log(payload);
})
router.get('/getHealthCareProfessional',authenticateHealthCareProfessional,async (req,res)=>{
    console.log("Hello My HealthCare Professional  Data");
    // // var cursor = UserOrganization.collection().find();
    // // console.log(cursor);
    // var resultArray = [];
    // const filter = {};
    // const all = await HealthCareProfessional.find(filter);
    // console.log(all);
    // res.send(all);
    res.send(req.rootUser);
})
router.get('/getSearchHealthCareProfessional',async (req,res)=>{
    console.log("Hello My HealthCare Professional  Data");
    // // var cursor = UserOrganization.collection().find();
    // // console.log(cursor);
    // var resultArray = [];
    const filter = {};
    const all = await HealthCareProfessional.find(filter);
    console.log(all);
    res.send(all);
    // res.send(req.rootUser);
   
    await User.find();
})


// Edit Details of Patient
router.post('/Editdetails',authenticate,async(req,res)=>{
     
    try{

        const {name, email, phone, work,gender,dob,pincode} = req.body;
        console.log(name);
        console.log(email);
        console.log(mobile);
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


router.post('/PostPdfFiletoAdmin',(req,res)=>{
    console.log("Hello My FileAdmin's Data");
    const file = req.body;
    console.log(file);
    // res.send(req.rootUser);
})

router.post('/payment', (req,res)=>{

//     const{amount,email} = req.body;
//     const totalAmount =JSON.stringify(amount);
//     console.log(totalAmount);
//     body = "{/*YOUR_COMPLETE_REQUEST_BODY_HERE*/}"
//     var params={};
//     params['MID'] = process.env.PAYTM_MID,
//     console.log(params['MID']);
//     params['WEBSITE'] = process.env.PAYTM_WEBSITE,
//     params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
//     params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
//     params['ORDER_ID'] = uuidv4(),
//     // params['CUST_ID'] = process.env.PAYTM_CUST_ID,
//     params['TXN_AMOUNT'] = totalAmount,
//     params['CALLBACK_URL'] = 'http://localhost:5000/payment',
//     params['EMAIL'] =email,
//     params['MOBILE_NO'] = '9876543210'
// /**
// * Generate checksum by parameters we have
// * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
// */
// var paytmChecksum = PaytmChecksum.generateSignature(params,process.env.PAYTM_MERCHANT_KEY);
// paytmChecksum.then(function(result){
// 	console.log("generateSignature Returns: " + result);
//     let paytmParams={
//         ...params,
//         "CHECKSUMHASH":checksum,
//     }
//     res.json(paytmParams);
// }).catch(function(error){
// 	console.log(error);
// });
const{amount,email}=req.body;

    /* import checksum generation utility */
const totalAmount=JSON.stringify(amount);
var params = {};

/* initialize an array */
params['MID'] = process.env.PAYTM_MID,
params['WEBSITE'] = process.env.PAYTM_WEBSITE,
params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
params['ORDER_ID'] = uuidv4(),
params['CUST_ID'] = process.env.PAYTM_CUST_ID,
params['TXN_AMOUNT'] = totalAmount,
params['CALLBACK_URL'] = 'http://localhost:5000/api/callback',
params['EMAIL'] =email,
params['MOBILE_NO'] = '9876543210'

/**
* Generate checksum by parameters we have
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
var paytmChecksum = PaytmChecksum.generateSignature(params, process.env.PAYTM_MERCHANT_KEY);
paytmChecksum.then(function(checksum){
    let paytmParams={
        ...params,
        "CHECKSUMHASH":checksum
    }
    res.json(paytmParams)
}).catch(function(error){
	console.log(error);
});
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






// New Backend
// router.post("/patient_register", patient_register);
// router.post("/patient_login", patient_login);
// router.get("/PatientHome", patient_Home);
const instance = new Razorpay({
     key_id: process.env.RAZORPAY_API_KEY,
     key_secret:process.env.RAZORPAY_API_SECRET 
})

// const checkout =require('../controllers/paytmController');
router.post("/checkout",async(req,res)=>{

        const options = {
            amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = await instance.orders.create(options);
        console.log(order);
        res.status(200).json({
            success:true,
            order,
        })
});
router.post("/paymentVerification",(req,res)=>{
    console.log(req.body);

    const {razorpay_order_id ,razorpay_payment_id,razorpay_signature } =req.body;


    const body=razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig received " ,razorpay_signature);
                                    console.log("sig generated ",expectedSignature);
    const isAuthenticated =expectedSignature===razorpay_signature;

    if(isAuthenticated)
    {
        // Database comes here

        res.redirect("http://localhost:3000/")
    }
    else{
        res.status(200).json({
            success:false,
        }) 
    }

    res.status(200).json({
        success:true,
    })
});
router.get("/getKey",(req,res)=>{
        res.status(200).json({key:process.env.RAZORPAY_API_KEY});
})


module.exports =router;