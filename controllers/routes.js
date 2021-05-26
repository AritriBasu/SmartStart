const express = require('express');
const router = express.Router();
const db = require('../helpers/dbServices');
const frontendData = require("../helpers/frontendData");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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
            res.render('cards',{errmsg:"Error in fetching startups!"});
        }
    }else{
        try {
            db.returnStartup(undefined, undefined, (result) => {
                res.render('cards', {
                    startups: result,
                });
            });
        } catch (err) {
            console.error(err);
            res.render('cards',{errmsg:"Error in fetching startups!"});
        }
    }
});

router.get("/signup/signup_investor", function(req,res){
  try{
    res.render("signup_investor");
  }
  catch(err){
    console.log(err);
    res.render('index',{errmsg:"Signup error!"});
  }
});

router.get("/signup/signup_startup", function(req,res){
  try{
    res.render("signup_startup");
  }
  catch(err){
  res.render('/',{errmsg:"Signup error!"});
  }
});

router.get("/signup/signup_intern", function(req,res){
  try{
    res.render("signup_intern");
  }
  catch(err){
  res.redirect('/',{errmsg:"Signup error!"});
  }
});

router.get("/logout", function(req, res){
    req.session.destroy();
    res.redirect('/');
});

router.post("/applyAsIntern", function(req, res){
    let startupEmail = req.body.startupEmail;
    let date = new Date();
    try{
    date.toISOString().split('T')[0];
    db.insertInternApplication(req.session.email, startupEmail, date, () => {
        res.redirect("/home");
    });
  }
  catch(err)
  {
    res.redirect('/',{errmsg:"Signup error!"});
  }
});

router.post("/applyAsInvestor", function(req, res){
  try{
    let startupEmail = req.body.startupEmail;
    let date = new Date();
    date.toISOString().split('T')[0];
    db.insertInvestApplication(req.session.email, date, startupEmail, () => {
        res.redirect("/home");
    });
  }
  catch(err){
    res.redirect('/',{errmsg:"Application error!"});
  }
});

router.post("/actionIntern", function(req, res){
    if(req.session.email !== undefined && req.session.type === "startup"){
        let internEmail = req.body.internEmail;
        let status = req.body.status;
        db.updateApplicationStatus(internEmail, req.session.email, status,() =>{
            res.redirect("/account");
        });
    }
});

router.get("/account", function(req,res){
    let type=req.session.type;
    if(type==="investor"){
      try {
        db.returnInvestor(req.session.email,(result)=>{
        res.render('account_investor', {
          compEmail: req.session.email,
          compType:result[0][0].companyType,
          compName:result[0][0].companyName,
          tableRow:result[1],
          headerData: frontendData.getHeaderLoginData(req.session),
          buttonData: frontendData.getCardsUserType(req.session) 
        })
      });//db
      } catch (err) {
        console.error(err);
        res.redirect('/',{errmsg:"Failed to fetch account!"});
      }
    }
    else if(type==="intern")
    {
      try {
        db.returnInternDetails(req.session.email, (result)=>{
            let tableData = [];
            for(let i of result[1]){
                if(i.status === "A"){
                    i.status = "Accepted";
                }else if (i.status === "R"){
                    i.status = "Rejected";
                }else if (i.status === "P"){
                    i.status = "Pending";
                }
                tableData.push(i);
            }


        res.render('account_intern', {
          internEmail: result[0][0].internEmail,
          internName:result[0][0].internName,
          college:result[0][0].college, 
          department:result[0][0].department, 
          qualifications:result[0][0].qualification,
          collegeDegree:result[0][0].collegeDegree,
          internDOB:result[0][0].internDOB,
          graduationYear:result[0][0].graduationYear,
          tableApplies:tableData,
          headerData: frontendData.getHeaderLoginData(req.session),
          buttonData: frontendData.getCardsUserType(req.session) 
        })
      });//db
      } catch (err) {
        console.error(err);
        res.redirect('/',{errmsg:"Failed to fetch account!"});
      }
    }
    else if (type==="startup"){
      
      try {
        db.returnStartupDetails(req.session.email,(result)=>{
        res.render('account_startup', {
          startupEmail: result[0][0].startupEmail,
          startName:result[0][0].startupName,
          startCIN:result[0][0].startupCIN, 
          startStage:result[0][0].startupStage, 
          startNature:result[0][0].startupNature, 
          startWebsiteLink:result[0][0].startupWebsiteLink, 
          startDetails:result[0][0].startupDetails,
          startlogo:result[0][0].startupLogo,
          tableIntern:result[1],
          tableInvestor:result[2],
          headerData: frontendData.getHeaderLoginData(req.session),
          buttonData: frontendData.getCardsUserType(req.session) 
        })
      });//db
      } catch (err) {
        console.error(err);
        res.redirect('/',{errmsg:"Failed to fetch account!"});
      }
    }
    });


//nodemailer setup
//setting up oauth client
const oauth2Client = new OAuth2(
  "6426417407-bkqep1oj9smqn6ni1mh1phftcd1lgvj3.apps.googleusercontent.com", // ClientID
  "bMJWuCsbIxZCnmiUS4RyUGN7", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

//refresh and acess token
oauth2Client.setCredentials({
  refresh_token: "1//04asIrHei8ulMCgYIARAAGAQSNwF-L9IrHGMkHIGEybrLME2wyjtrsPpvyPQnHYvOAs1UDMBrWKV9mEX5KzbCjPXIpEJU3PAz51Q"
});
const accessToken = oauth2Client.getAccessToken()

//to get form data
router.post('/submit-data', function (req, res) {
  const output=`
  <p>You have a new contact request</p>
  <h3>Contact details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
    <h3>Message: <p>${req.body.message}</p></h3>
  `
  //nodemailer syntax

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "aritri.basu2019@vitstudent.ac.in", 
         clientId: "6426417407-bkqep1oj9smqn6ni1mh1phftcd1lgvj3.apps.googleusercontent.com",
         clientSecret: "bMJWuCsbIxZCnmiUS4RyUGN7",
         refreshToken: "1//04asIrHei8ulMCgYIARAAGAQSNwF-L9IrHGMkHIGEybrLME2wyjtrsPpvyPQnHYvOAs1UDMBrWKV9mEX5KzbCjPXIpEJU3PAz51Q",
         accessToken: accessToken
    },
    tls:{
      rejectUnauthorized:false
    }
});

  
  var mailOptions = {
    from: 'aritri.basu2019@vitstudent.ac.in',
    to: 'ritwik.sinha2019@vitstudent.ac.in',
    subject: 'New query from Smart Start',
    html: output
  };
  
  smtpTransport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      const errmsg="Your message could not be delivered. Please retry or contact us using the details below Hoping to hear from you soon!"
      res.render('index',
      {msg:errmsg,
      headerData: frontendData.getHeaderLoginData(req.session),
      buttonData: frontendData.getCardsUserType(req.session) });
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  const sentmsg="Your request has been submitted. We will get back to you shortly!";
  //after submission
  res.render('index',
  {
   msg:sentmsg,
   headerData: frontendData.getHeaderLoginData(req.session),
   buttonData: frontendData.getCardsUserType(req.session)
  });
  smtpTransport.close();
});


module.exports = router;