const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  
  cid: {
    type: String,
    required: [true, "Please provide cId"],
  },

  complaintStatus: {
    type: String,
    default: "",
  },
});

module.exports = Complaint = mongoose.model("complaints", UserSchema);
