const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Police = require("../models/Police");

//get user data
exports.getuser = async (req, res, next) => {
    try {
        // console.log(req.user)
        const { _id, fullname, email , profileImg, strike , accountStatus , ...other } = req.user;
        res.status(200).json({ _id, fullname,  email, profileImg ,strike , accountStatus });
    } catch (err) {
        next(err);
    }
};


//get user data
exports.getpolice = async (req, res, next) => {
    try {
        console.log(req.police)
        const { _id, name, email ,  profileImg, contact , address ,pincode , ...other } = req.police;
        res.status(200).json({ _id, name, email ,  profileImg, contact , address ,pincode  });
    } catch (err) {
        next(err);
        
    }
};





 