const bcrypt = require('bcrypt');
const professional = require("../models/professionalSchema");
const organisation = require("../models/organisationSchema");
const createError = require('../utils/error');
const jwt = require('jsonwebtoken');
const document = require('../models/document');
const user = require("../models/user");
const { generate_key_pair } = require('./digital_signatures');


const professional_register = async (req,res,next) =>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        console.log(req.body.pincode);
        console.log(req.body.location);
        const newProfessional = new professional({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            qualification:req.body.qualification,
            gender:req.body.gender,
            dob:req.body.dob,
            location:req.body.location,
            pincode:req.body.pincode,
            status:1,
            password:hash,
            //registration_documents: req.body.registration_documents
        });
        await newProfessional.save();

        const newDocument1 = new document({
            document_name:"registration document 1",
            user_type: "professional",
            user_id:newProfessional._id,
            // document_type:"registration document 1",
            document:req.body.documents[0]
        });
        await newDocument1.save();

        const newDocument2 = new document({
            document_name:"registration document 2",
            user_type: "professional",
            user_id:newProfessional._id,
            // document_type:"registration document 2",
            document:req.body.documents[1]
        });
        await newDocument2.save();
        const docs = [newDocument1._id,newDocument2._id];
        await professional.findByIdAndUpdate(newProfessional._id,{$set:{registration_documents:docs}});
        console.log(newProfessional);

        const {private_key,public_key} = await generate_key_pair;
        const newUser = new user({
            email:req.body.email,
            user_type:"professional",
            privateKey:private_key,
            publicKey:public_key
        });
        await newUser.save();
        
        //res.status(200).json(newProfessional);
        res.json({status:200,newProfessional});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const professional_login = async (req,res,next) =>{
    try {
        const t = await professional.findOne({email:req.body.email});
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
        console.log(userToken);
        res
            .cookie("access_token", userToken, {
                httpOnly:true
            })
            .json({status: 200 , ...otherDetails});
    } catch (error) {
        next(error);
    }
};


const organisation_login = async (req,res,next) =>{
    try {
        const t = await organisation.findOne({email:req.body.email});
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
            .json({status: 200 , ...otherDetails});
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
            //registration_documents: req.body.registration_documents
            
        });
        await newOrganisation.save();

        const newDocument1 = new document({
            user_type: "organisation",
            user_id:newOrganisation._id,
            document_name:"registration document 1",
            document:req.body.documents[0]
        });
        await newDocument1.save();

        const newDocument2 = new document({
            user_type: "organisation",
            user_id:newOrganisation._id,
            document_name:"registration document 2",
            document:req.body.documents[1]
        });
        await newDocument2.save();

        const docs = [newDocument1._id,newDocument2._id];
        await organisation.findByIdAndUpdate(newOrganisation._id,{$set:{registration_documents:docs}});
        console.log(newOrganisation);

        const {private_key,public_key} = await generate_key_pair;
        const newUser = new user({
            email:req.body.email,
            user_type:"Organisation",
            privateKey:private_key,
            publicKey:public_key
        });
        await newUser.save();
        
        //res.status(200).json(newProfessional);
        res.json({status:200,newOrganisation});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    professional_register,professional_login,organisation_resgister,organisation_login
};
