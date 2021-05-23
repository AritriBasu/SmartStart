const express = require('express');
const db = require('../helpers/dbServices');
const router = express.Router();



router.post('/investorSignUp', function(req, res) {
    let companyName = req.body.cname;
    let companyEmail = req.body.cemail;
    let companyType = req.body.ctype;
    let companyPass = req.body.cpass;

    db.validateEmail(companyEmail, () => {
        db.insertNewInvestor(companyName, companyEmail, companyType, companyPass, () => {
            res.redirect('/');
        });
    });
});



module.exports = router;