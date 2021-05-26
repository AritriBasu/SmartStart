const express = require('express');
const db = require('../helpers/dbServices');
const router = express.Router();


router.post('/login', function(req, res){
    let email = req.body.email;
    let password = req.body.password;
    
    db.authenticateUser(email, password, (e, i) =>{
        req.session.email = e;
        req.session.type = i;
        res.redirect('/');
    }, () => {
        req.session.error = true;
        req.session.errmsg = "Login failed.";
        res.redirect('/login');
    });
    
});

module.exports = router;