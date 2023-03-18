const express = require('express');
const router = express.Router();
const { signupUser , signupPolice, signinPolice, signinUser} = require('../controllers/auth')


//user Auth
router.route("/signupuser").post(signupUser);
router.route("/signinuser").post(signinUser);
router.route("/signuppolice").post(signupPolice);
router.route("/signinpolice").post(signinPolice);

module.exports = router;