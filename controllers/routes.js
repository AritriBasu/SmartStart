const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('index');
});

router.get("/login", function(req,res) {
    res.render("login");
});

router.get("/home", function(req,res){
    res.render("cards");
});

router.get("signup/signup-investor", function(req,res){
    res.render("signup_investor");
});

router.get("signup/signup-startup", function(req,res){
    res.render("signup_startup");
});

router.get("signup/signup-intern", function(req,res){
    res.render("signup_intern");
});


module.exports = router;