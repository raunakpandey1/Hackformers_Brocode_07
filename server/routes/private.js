const express = require('express');
const router = express.Router();

const {getuser, getpolice} = require('../controllers/private');
const {protectUser} = require('../middleware/authUser');
const {protectPolice} = require('../middleware/authPolice');

router.route("/getuser").get(protectUser, getuser);
router.route("/getpolice").get(protectPolice, getpolice);

module.exports = router;