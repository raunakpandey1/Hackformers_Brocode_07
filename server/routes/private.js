const express = require('express');
const router = express.Router();

const {getuser, getpolice, complaintStatus, checkcomplaintStatus, checkcomplaintStatusUser} = require('../controllers/private');
const {protectUser} = require('../middleware/authUser');
const {protectPolice} = require('../middleware/authPolice');

router.route("/getuser").get(protectUser, getuser);
router.route("/getpolice").get(protectPolice, getpolice);
router.route("/setcomplaintstatus").post(protectPolice, complaintStatus);
router.route("/checkcomplaintstatus").post(protectPolice, checkcomplaintStatus);

router.route("/checkcomplaintstatususer").post(protectUser, checkcomplaintStatusUser);
module.exports = router;