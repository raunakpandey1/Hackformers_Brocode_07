const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Police = require("../models/Police");
const Complaint = require("../models/Complaint");

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


exports.complaintStatus = async (req, res, next) => {
    const { cid , complaintStatus } = req.body;
    console.log(req.body)
    
    try {
       
       
      const oldComplaint = await Complaint.findOne({ cid: req.body.cid });
      console.log()  
      if(oldComplaint){
        await oldComplaint.updateOne({ $set: { complaintStatus: complaintStatus } });
        res.status(200).json(true);
      }else {
        await Complaint.create({
            cid,
            complaintStatus
          });
          res.status(200).json(true);
      }
    }
    catch (err) {
      next(err);
    }
  };
  

  exports.checkcomplaintStatus = async (req, res, next) => {
    const {  cid  } = req.body;
    console.log(req.body)
    
    try {
      const oldComplaint = await Complaint.findOne({ cid: req.body.cid });

      if(oldComplaint){
        res.status(200).json({complaintStatus : oldComplaint.complaintStatus});
      }else {
        res.status(200).json({complaintStatus : ""});
      
      }
      
       
    }
    catch (err) {
      next(err);
    }
  };

  exports.checkcomplaintStatusUser = async (req, res, next) => {
    const {  cid  } = req.body;
    console.log(req.body)
    
    try {
      const oldComplaint = await Complaint.findOne({ cid: req.body.cid });

      if(oldComplaint){
        res.status(200).json({complaintStatus : oldComplaint.complaintStatus});
      }else {
        res.status(200).json({complaintStatus : ""});
      
      } 
    }
    catch (err) {
      next(err);
    }
  };




 