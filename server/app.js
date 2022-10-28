const express =require('express')
const app =express();
const mongoose =require('mongoose')
const dotenv =require('dotenv')
const cookieParser = require('cookie-parser');
app.use(cookieParser())
dotenv.config({path:'./config.env'})
const PORT =process.env.PORT;
const PaytmChecksum = require('./PaytmChecksum');
require('./db/conn')
app.use(express.json())
app.use(express.urlencoded({extended:true}));
//const user =require('./models/userSchema')
//We link the router files to make our route easy.
app.use(require('./router/auth'));
//app.use(express.json())

//const DB ='mongodb+srv://Aditya_Peer:root@cluster0.vrh9rbc.mongodb.net/mernstack?retryWrites=true&w=majority'
// mongoose.connect(DB).then(()=>{
//     console.log("connected Sucessfully.");
// }).catch((err)=> console.log("no connection"));
// Middleware
// const middleware =(req,res,next)=>{
//     console.log('Hello my middleware')
//     next();
// }


// app.get('/',(req,res)=>{
//     res.send(`Hello World from the server app js`);
// });
// app.use(cookieParser());
app.get('/contact',(req,res)=>{
    res.send(`Hello World Contact from the server`);
});
// app.get('/about',(req,res)=>{
//     res.send(`Hello World About from the server`);
// });
app.listen(PORT,()=>{
    console.log(`Server is running at port no. ${PORT}`);
})