const express = require('express');
const router = express.Router();
const db = require('../helpers/dbServices');

router.get('/', function(req, res){
    console.log(req.session.email);
    console.log(req.session.type);
    type=req.session.type;
    res.render('index');
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
    if(type==="investor"){
      try {
        db.returnStartup((result)=>{
        console.log(result[0].startupLogo);
        res.render('cards_investor', {
          email: req.session.email,
          startups:result
        })
        //console.log("hello");
      });//db
      } catch (err) {
        console.error(err);
      }
   }
   else if (type==="intern"){
    try {
      db.returnStartup((result)=>{
      console.log(result[0].startupLogo);
      res.render('cards_intern', {
        email: req.session.email,
        startups:result
      })
      //console.log("hello");
    });//db
    } catch (err) {
      console.error(err);
    }
   }//else if
   else{
    try {
      db.returnStartup((result)=>{
      console.log(result[0].startupLogo);
      res.render('cards_startup', {
        email: req.session.email,
        startups:result
      })
      //console.log("hello");
    });//db
    } catch (err) {
      console.error(err);
    }
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

});

router.get("/account", function(req,res){
    let type=req.session.type;
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
        db.returnInternDetails(req.session.email,(result)=>{
        res.render('account_intern', {
          internEmail: result[0].internEmail,
          internName:result[0].internName,
          college:result[0].college, 
          department:result[0].department, 
          qualifications:result[0].qualification,
          collegeDegree:result[0].collegeDegree,
          internDOB:result[0].internDOB,
          graduationYear:result[0].graduationYear
        })
      });//db
      } catch (err) {
        console.error(err);
      }
    }
    else{
      
      try {
        db.returnStartupDetails(req.session.email,(result)=>{
        res.render('account_startup', {
          startupEmail: result[0].startupEmail,
          startName:result[0].startupName,
          startCIN:result[0].startupCIN, 
          startStage:result[0].startupStage, 
          startNature:result[0].startupNature, 
          startWebsiteLink:result[0].startupWebsiteLink, 
          startDetails:result[0].startupDetails
        })
      });//db
      } catch (err) {
        console.error(err);
      }
    }
    });

module.exports = router;