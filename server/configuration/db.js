const mongoose = require("mongoose");
require('dotenv').config({path:"./config.env"})
// mongoose.set('strictQuery', true);
const connectDB = async () => {
  // console.log(process.env.MONGO_URI)
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  });
  console.log("MongoDB Connected");
};

module.exports = connectDB;