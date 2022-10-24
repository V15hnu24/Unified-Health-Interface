const bcrypt = require('bcrypt');
const patient = require("../models/patient");
const admin = require("../models/admin");
const createError = require('../utils/error');
const jwt = require('jsonwebtoken');

const patient_register = async (req,res,next) =>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new patient({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            mobile:req.body.mobile,
            status:1,
            country:req.body.country,
            city:req.body.city,
            state:req.body.state,
            pincode:req.body.pincode
        });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        next(error);
    }
};

const admin_register = async (req,res,next) =>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new admin({
            username:req.body.username,
            email:req.body.email,
            mobile:req.body.mobile,
            isAdmin:req.body.isAdmin,
            password:hash
        });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        next(error);
    }
};

const patient_login = async (req,res,next) =>{
    try {
        const tempUser = await patient.findOne({username:req.body.username});
        if(!tempUser) return next(createError(404, "User not Found"));

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
        res
            .cookie("access_token", userToken, {
                httpOnly:true
            })
            .status(200).json({...otherDetails});
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
            .status(200).json({...otherDetails});
    } catch (error) {
        next(error);
    }
};


module.exports = {
    patient_register,patient_login,admin_register,admin_login
};