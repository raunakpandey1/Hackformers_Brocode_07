const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const Police = require("../models/Police");

//  SignIn user
exports.signinUser = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email)
    if (!email || !password) {
     
      return next(new ErrorResponse("Please provide an email and password", 400));
    }
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      sendToken(user, 200, res);
    } catch (err) {
      next(err);
    }
  };

  //   Register user
exports.signupUser = async (req, res, next) => {
    const { fullname, email, password, cpassword } = req.body;
    console.log(req.body)
    console.log(email)
    try {
      const oldUser = await User.findOne({ email: req.body.email });
      if (password != cpassword) {
        return res.status(401).json({ sucess: false, error: "Invalid credential" });
      }
      if (oldUser) {
        return res.status(409).json({ sucess: false, error: "user already exist" })
      }
      
      const user = await User.create({
        fullname,
        email,
        password,
      });
  
      sendToken(user, 200, res);
    }
    catch (err) {
      next(err);
    }
  };
  

  //  SignIn Police
exports.signinPolice = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email , password)
    if (!email || !password) {
     
      return next(new ErrorResponse("Please provide an email and password", 400));
    }
    try {
      const user = await Police.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      sendToken(user, 200, res);
    } catch (err) {
      next(err);
    }
  };


  //Signup Police station
   
exports.signupPolice = async (req, res, next) => {
    const { name, email, contact , password, cpassword , address , pincode} = req.body;
    console.log(req.body)
    console.log(email)
    try {
      const oldUser = await Police.findOne({ email: req.body.email });
      if (password != cpassword) {
        return res.status(401).json({ sucess: false, error: "Invalid credential" });
      }
      if (oldUser) {
        return res.status(409).json({ sucess: false, error: "user already exist" })
      }
      
      const user = await Police.create({
        name,
        email,
        contact,
        password,
        address , 
        pincode
      });
  
      sendToken(user, 200, res);
    }
    catch (err) {
      next(err);
    }
  };

  const sendToken = async (user, statusCode, res) => {
    const token = await user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
  };




 