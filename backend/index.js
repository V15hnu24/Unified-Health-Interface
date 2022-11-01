const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
app.use(express.json());
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const mutler = require('multer');
app.use('/uploads', express.static('uploads'));
const DB_Connection_URL = process.env.Mongo;
const cors = require('cors');
const patientRoute = require('./models/patient');
const adminRoute = require('./routes/admin');
const adminpanelrouter = require('./routes/adminpanel');
const organisationRoute = require("./routes/v_org");
const proffesionalRoute = require("./routes/v_pro");
const razorpayRoute = require('./routes/razorpay');
app.use(cors());

const DBconnect = async () => {
    try{
        await mongoose.connect(DB_Connection_URL);
        console.log("Connected to DB");
    }catch(error){
        console.log("Error connecting with DB" + error);
        throw error;
    }
};


mongoose.connection.on('disconnected', ()=>{
    console.log("MongoDb Disconnected");
});

mongoose.connection.on('connected', ()=>{
    console.log("MongoDB Connected");
});



app.use(cookieParser());
app.use('/auth', authRoute);
app.use('/patient', patientRoute);
// app.use('/admin', adminRoute);
app.use('/adminpanel', adminpanelrouter);
app.use('/organisation', organisationRoute);
app.use('/professional', proffesionalRoute);
app.use('/razorpay', razorpayRoute);

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something not right!!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

// Admin bro

const AdminBro = require('admin-bro');
const mongooseAdminBro = require('@admin-bro/mongoose');
const expressAdminBro = require('@admin-bro/express');

const connection = mongoose.connection;

// const {createConnection} = require('typeorm');
// const {AdminBroOptions} = require('admin-bro');
// const {Database, Resource} = require('admin-bro-typeorm');

// const {validate} = require('class-validator');

// import "reflect-metadata";
// import {createConnection} from "typeorm";
// import express from 'express'
// import AdminBro, { AdminBroOptions } from 'admin-bro'
// import * as AdminBroExpress from 'admin-bro-expressjs'
// import { Database, Resource } from "admin-bro-typeorm";

// import {validate} from 'class-validator'
// Resource.validate = validate


const patient = require('./models/patient');
const Admin = require('./models/admin');
const rejected_patient = require('./models/rejected_patients');
const blocked_patient = require('./models/blocked_patients');
const email_otp = require('./models/email_otp');
const organisation = require('./models/organisationSchema');
const proffesional = require('./models/professionalSchema');
const adminUpdate = require('./models/admin_update');


const { verifyAdmin } = require('./utils/verifyToken');

AdminBro.registerAdapter(mongooseAdminBro)
const optionnss = {
  resources: [organisation, patient, proffesional]
}

const adminBro = new AdminBro(optionnss)
const router = expressAdminBro.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(5000, ()=>{
    DBconnect();
    console.log("Connected to main file of backend!");
});