const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PoliceSchema = new mongoose.Schema({
  profileImg: {
    type: String,
    required: true,
    default: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png",
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  contact: {
    type: String,
    required: [true, "Please provide Contact Number"],
    minlength : 10,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 8,
    select: false,
  },
  address: {
    type: String,
    required: [true, "Please provide Address"],
  },
  pincode: {
    type: String,
    required: [true, "Please provide Pin code"],
  },
  

  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]

});

PoliceSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

PoliceSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

PoliceSchema.methods.getSignedJwtToken = async function () {
  try {
    let token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

module.exports = User = mongoose.model("police", PoliceSchema);