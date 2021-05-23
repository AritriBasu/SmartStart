const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    console.log(req.session.email);
    console.log(req.session.type);
    res.render('index');
});

router.get("/login", function(req,res) {
    if(req.session.email !== undefined){
        res.redirect('/home');
    }else{
        res.render("login");
    }
});

router.get("/home", function(req, res){
    res.render("cards");
});

router.get("/signup/signup_investor", function(req,res){
    res.render("signup_investor");
});

router.get("/signup/signup_startup", function(req,res){
    res.render("signup_startup");
});

router.get("/signup/signup_intern", function(req,res){
    res.render("signup_intern");
});


module.exports = router;