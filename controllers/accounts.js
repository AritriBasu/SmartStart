const express = require('express');
const router = express.Router();

router.get("/account/investor_account", function(req,res){
    res.render("signup_investor");
});

module.exports=router;