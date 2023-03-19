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
    const { userId , cid , complaintStatus } = req.body;
    console.log(req.body)
    
    try {
      const oldUser = await User.findOne({ _id: req.body.userId });
      
       
      if (!oldUser) {
        return res.status(409).json({ sucess: false, error: "user does not exist" })
      }

      if(complaintStatus=="Reject"){
        await oldUser.updateOne({ $push: { strike: new Date() } });
        res.status(200).json(true);
      }

      const oldComplaint = await Complaint.findOne({ cid: req.body.cid });

      if(oldComplaint){
        await oldComplaint.updateOne({ $set: { complaintStatus: complaintStatus } });
      }else {
        await Complaint.create({
            userId,
            cid,
            complaintStatus
          });
      
      }
      
       
    }
    catch (err) {
      next(err);
    }
  };
  




 