const express = require('express');
const router = express.Router();

const {getuser, getpolice, complaintStatus} = require('../controllers/private');
const {protectUser} = require('../middleware/authUser');
const {protectPolice} = require('../middleware/authPolice');

router.route("/getuser").get(protectUser, getuser);
router.route("/getpolice").get(protectPolice, getpolice);
router.route("/setcomplaintstatus").post(protectPolice, complaintStatus);
module.exports = router;