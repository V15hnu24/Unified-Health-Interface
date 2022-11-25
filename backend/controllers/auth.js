const bcrypt = require('bcrypt');
const patient = require("../models/patient");
const admin = require("../models/admin");
const createError = require('../utils/error');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/upload');
const user = require("../models/user");
const document = require('../models/document');
const { generate_key_pair } = require('./digital_signatures');


const patient_register = async (req,res,next) =>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        const check_user = await patient.findOne({email:req.body.email});
        if(check_user) return next(createError(400, "User already exists as "));
        
        console.log(req.body);


        const newPatient = new patient({
            name:req.body.name,
            password:req.body.hash,
            email:req.body.email,
            mobile:req.body.mobile,
            status:1,
            country:req.body.country,
            city:req.body.city,
            state:req.body.state,
            pincode:req.body.pincode,
            dob:req.body.dob,
            gender:req.body.gender
            // registration_documents: req.body.documents
        });
        await newPatient.save();
        
        const newDocument1 = new document({
            owner_name: req.body.name,
            document_name: "regustration document 1", 
            user_type: "patient",
            user_id:newPatient._id,
            document:req.body.documents[0]
        });
        await newDocument1.save();

        const newDocument2 = new document({
            owner_name: req.body.name,
            document_name: "regustration document 1", 
            user_type: "patient",
            user_id:newPatient._id,
            document:req.body.documents[1]
        });
        await newDocument2.save();

        const docs = [newDocument1._id,newDocument2._id];
        await patient.findByIdAndUpdate(newPatient._id,{$set:{registration_documents:docs}});
        
        const {private_key,public_key} = await generate_key_pair;
        const newUser = new user({
            email:req.body.email,
            user_type:"patient",
            privateKey:private_key,
            publicKey:public_key
        });
        await newUser.save();
        
        console.log(newPatient);
        res.json({status:200,newPatient});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const admin_register = async (req,res,next) =>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const check_user = await user.findOne({email:req.body.email});
        if(check_user) return next(createError(400, "User already exists as " + check_user.user_type));

        const newUser = new user({
            email:req.body.email,
            user_type:"patient"
        });
        await newUser.save();

        const newAdmin = new admin({
            username:req.body.username,
            email:req.body.email,
            mobile:req.body.mobile,
            isAdmin:req.body.isAdmin,
            password:hash
        });
        await newAdmin.save();
        res.json({status:200,newUser});
    } catch (error) {
        next(error);
    }
};

const patient_login = async (req,res,next) =>{
    console.log(req.body);

    try {
        const tempUser = await patient.findOne({email:req.body.email});
        if(!tempUser) return next(createError(404, "User not Found"));

        console.log(req.body.password)
        console.log(tempUser.password)

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,  
            tempUser.password
            );

        if(!isPasswordCorrect) return next(createError(400, "Wrong password or Username!"));
        const userToken = jwt.sign(
            {id: tempUser._id},
            process.env.JWT
        );

        const { password, ...otherDetails } = tempUser._doc;
        console.log(otherDetails);
        console.log(userToken);
        res
            .cookie("access_token", userToken, {
                httpOnly:true
            })
            .json({status: 200 , ...otherDetails});
        // res.status(200).send(tempUser._doc);
    } catch (error) {
        next(error);
    }
};

const admin_login = async (req,res,next) =>{
    try {
        const tempUser = await admin.findOne({username:req.body.username});
        if(!tempUser) return next(createError(404, "User not Found"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, 
            tempUser.password
            );

            if(!isPasswordCorrect) return next(createError(400, "Wrong password or Username!"));
        const userToken = jwt.sign(
            {id: tempUser._id ,  isAdmin:tempUser.isAdmin},
            process.env.JWT
        );

        const { password, isAdmin, ...otherDetails } = tempUser._doc;
        
        res
            .cookie("access_token", userToken, {
                httpOnly:true
            })
            .json({status:200,...otherDetails});
    } catch (error) {
        next(error);
    }
}; 

const logout = async (req,res,next) =>{
    try {
        res
            .cookie("access_token", "", {
                httpOnly:true
            })
            .json({status:200,message:"Logged out successfully"});
    } catch (error) {
        next(error);
    }
};

 

module.exports = {
    patient_register,patient_login,admin_register,admin_login, logout
};