const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Police = require("../models/Police");

//get user data
exports.getuser = async (req, res, next) => {
    try {
        console.log(req.user)
        const { _id, fullname, email , profileImg, ...other } = req.user;
        res.status(200).json({ _id, fullname,  email, profileImg });
    } catch (err) {
        next(err);
    }
};


//get user data
exports.getpolice = async (req, res, next) => {
    try {
        const { _id, name, email ,  profileImg, contact , address ,pincode , ...other } = req.user;
        res.status(200).json({ _id, name,  email, profileImg });
    } catch (err) {
        next(err);
        
    }
};





 