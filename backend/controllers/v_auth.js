const bcrypt = require('bcrypt');
const professional = require("../models/professionalSchema");
const organisation = require("../models/organisationSchema");
const createError = require('../utils/error');
const jwt = require('jsonwebtoken');

const professional_register = async (req,res,next) =>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newProfessional = new professional({
            name:req.body.name,
            email:req.body.email,
            password:hash,
            phone:req.body.phone,
            status:1,
            qualification:req.body.qualification,
            registration_documents: req.body.registration_documents
        });
        await newProfessional.save();
        res.status(200).json(newProfessional);
    } catch (error) {
        next(error);
    }
};

const professional_login = async (req,res,next) =>{
    try {
        const t = await professional.findOne({name:req.body.name});
        if(!t) return next(createError(404, "User not Found"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, 
            t.password
            );
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or Username!"));
        const userToken = jwt.sign(
            {id: t._id},
            process.env.JWT
        );

        const { password, ...otherDetails } = t._doc;
        res
            .cookie("access_token", userToken, {
                httpOnly:true
            })
            .status(200).json({...otherDetails});
    } catch (error) {
        next(error);
    }
};


const organisation_login = async (req,res,next) =>{
    try {
        const t = await organisation.findOne({name:req.body.name});
        if(!t) return next(createError(404, "User not Found"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, 
            t.password
            );
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or Username!"));
        const userToken = jwt.sign(
            {id: t._id},
            process.env.JWT
        );

        const { password, ...otherDetails } = t._doc;
        res
            .cookie("access_token", userToken, {
                httpOnly:true
            })
            .status(200).json({...otherDetails});
    } catch (error) {
        next(error);
    }
};


const organisation_resgister = async (req,res,next) =>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newOrganisation = new organisation({
            name:req.body.name,
            email:req.body.email,
            password:hash,
            phone:req.body.phone,
            description:req.body.description,
            location:req.body.location,
            organisationType:req.body.organisationType,
            registration_documents: req.body.registration_documents
            
        });


        await newOrganisation.save();
        res.status(200).json(newOrganisation);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    professional_register,professional_login,organisation_resgister,organisation_login
};

