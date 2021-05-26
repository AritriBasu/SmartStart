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
            db.returnStartup(req.session.email, req.session.type, (result) => {
                res.render('cards', {
                    startups: result,
                    headerData: frontendData.getHeaderLoginData(req.session),
                    buttonData: frontendData.getCardsUserType(req.session) 
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

router.post("/applyAsIntern", function(req, res){
    let startupEmail = req.body.startupEmail;
    let date = new Date();
    date.toISOString().split('T')[0];
    db.insertInternApplication(req.session.email, startupEmail, date, () => {
        res.redirect("/home");
    });
});

router.post("/applyAsInvestor", function(req, res){
    let startupEmail = req.body.startupEmail;
    let date = new Date();
    date.toISOString().split('T')[0];
    db.insertInvestApplication(req.session.email, date, startupEmail, () => {
        res.redirect("/home");
    });
});

router.get("/account", function(req,res){
    let type=req.session.type;
    if(type==="investor"){
      try {
        db.returnInvestor(req.session.email,(result)=>{
        res.render('account_investor', {
          headerData: frontendData.getHeaderLoginData(req.session),
          buttonData: frontendData.getCardsUserType(req.session),
          compEmail: req.session.email,
          compType:result[0][0].companyType,
          compName:result[0][0].companyName,
          tableRow:result[1]
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
          headerData: frontendData.getHeaderLoginData(req.session),
          buttonData: frontendData.getCardsUserType(req.session),
          internEmail: result[0][0].internEmail,
          internName:result[0][0].internName,
          college:result[0][0].college, 
          department:result[0][0].department, 
          qualifications:result[0][0].qualification,
          collegeDegree:result[0][0].collegeDegree,
          internDOB:result[0][0].internDOB,
          graduationYear:result[0][0].graduationYear,
          tableApplies:result[1]
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
          headerData: frontendData.getHeaderLoginData(req.session),
          buttonData: frontendData.getCardsUserType(req.session),
          startupEmail: result[0][0].startupEmail,
          startName:result[0][0].startupName,
          startCIN:result[0][0].startupCIN, 
          startStage:result[0][0].startupStage, 
          startNature:result[0][0].startupNature, 
          startWebsiteLink:result[0][0].startupWebsiteLink, 
          startDetails:result[0][0].startupDetails,
          tableIntern:result[1],
          tableInvestor:result[2]
        })
      });//db
      } catch (err) {
        console.error(err);
      }
    }
    });

module.exports = router;