const express = require('express');
const db = require('../helpers/dbServices');
const router = express.Router();


router.post('/investorSignUp', function(req, res) {
    let companyName = req.query.cname;
    let companyEmail = req.query.cemail;
    let companyType = req.query.ctype;
    let companyPass = req.query.cpass;

    console.log(db.validateEmail(companyEmail));
});



module.exports = router;