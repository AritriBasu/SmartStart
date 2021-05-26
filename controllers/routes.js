const express = require('express');
const router = express.Router();
const db = require('../helpers/dbServices');
const frontendData = require("../helpers/frontendData")

router.get('/', function(req, res){
    console.log(req.session.email);
    console.log(req.session.type);
    
    res.render('index', {
        headerData: frontendData.getHeaderLoginData(req.session)
    });
});

router.get("/login", function(req,res) {
    if(req.session.email !== undefined){
        res.redirect("/home")
    }
    else{
        res.render('login');
    }
});


router.get("/home", function(req, res){
    if(req.session.email !== undefined){
        try {
            db.returnStartup((result)=>{
                let b = frontendData.getCardsUserType(req.session);
                console.log(b);

                res.render('cards', {
                    startups: result,
                    headerData: frontendData.getHeaderLoginData(req.session),
                    buttonData: b 
                });
            });
        } catch (err) {
            console.error(err);
        }
    }//if signed in
});

router.get("/signup/signup_investor", function(req,res){
    res.render("signup_investor");
});

router.get("/signup/signup_startup", function(req,res){
    res.render("signup_startup")
});

router.get("/signup/signup_intern", function(req,res){
    res.render("signup_intern");
});

router.get("/logout", function(req, res){
    req.session.destroy();
    res.redirect('/');
});

router.get("/account", function(req,res){
    let type = req.session.type;
    if(type==="investor"){
      try {
        db.returnInvestor(req.session.email,(result)=>{
        res.render('account_investor', {
          compEmail: req.session.email,
          compType:result[0].companyType,
          compName:result[0].companyName
        })
      });//db
      } catch (err) {
        console.error(err);
      }
    }
    else if(type==="intern")
    {
        try {
            console.log(req.session.email);
            res.render('account_intern', {
              email: req.session.email
            }); 
          } catch (err) {
            console.error(err);
          }
    }
    else{
         try {
        console.log(req.session.email);
        res.render('account_startup', {
          email: req.session.email
        }); 
      } catch (err) {
        console.error(err);
      }
    }
});




module.exports = router;