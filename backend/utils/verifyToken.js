const createError = require('./error');
const jwt = require('jsonwebtoken');

const verifyToken = (req,res, next) =>{
    const tempToken = req.cookies.access_token;
    if(!tempToken) return next(createError(401, "You are not authenticated!"));

    jwt.verify(tempToken, process.env.JWT, (err, user) =>{
        if(err) return next(createError(403, "Token is not valid!"));
        
        req.user = user;
        next();
    });
};

const verifyUser = (req,res, next)=>{
    verifyToken(req,res, next ,()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next();
        }else{
            next(createError(403, "You are not authenticated!"));
        }
    });
};

const verifyAdmin = (req,res, next)=>{
    verifyToken(req,res, next ,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            next(createError(403, "You are not authenticated!"));
        }
    });
};

const verifyDocumentAccess = (req,res, next)=>{
    verifyToken(req,res, next ,()=>{
        const tempDocument = document.findById(req.params.id);
        if(!tempDocument) return next(createError(404, "Document not found!"));

        const ary = tempDocument.access_to;
        if(ary.some((item)=>item.user_email == user.email || req.user.isAdmin)){
            next();
        }
        else{
            next(createError(403, "You are not authenticated!"));
        }
    });
};

module.exports = {verifyToken , verifyUser, verifyAdmin, verifyDocumentAccess};