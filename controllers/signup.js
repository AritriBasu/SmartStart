const express = require('express');
const db = require('../helpers/dbServices');
const upload = require('../config/multerConfig');

const fs = require('fs');
const path = require('path');

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

router.post('/internSignUp', function(req,res){
    let internName = req.body.internName;
    let internEmail = req.body.internEmail;
    let internPass = req.body.internPass;
    let internDOB =req.body.internDOB;//YYYY-MM-DD
    let internQualification =req.body.internQualification;
    let internYearGrad = req.body.internYearGrad;
    let internDegree = req.body.internDegree;
    let internDepartment =req.body.internDepartment;
    let internCollege = req.body.internCollege;

    
    internYearGrad += '-00-00';
    db.validateEmail(internEmail,() => {
        db.insertNewIntern(internEmail, internPass, internName, internDOB, internQualification, internYearGrad, internCollege, internDegree, internDepartment, () => {
            res.redirect('/');
        });
    });

});

router.post('/startupSignUp', upload.single("startupLogo"), function(req, res) {

    let startupName = req.body.startupName;
    let startupCIN = req.body.startupCIN;
    let startupEmail = req.body.startupEmail;
    let startupPass = req.body.startupPass;
    let startupNature = req.body.startupNature;
    let startupStage = req.body.startupStage;
    let startupWebLink = req.body.startupWebLink;
    let startupFounder = req.body.startupFounder;
    let startupInternPos = req.body.startupInternPos;
    let startupIndustry = req.body.startupIndustry;
    let startupDetails = req.body.startupDetails;

    let founders = startupFounder.split(",");
    let internPosNeeded = startupInternPos.split(",");


    //startupEmail, startupName, startupCIN, startupPassword, startupStage,startupNature, startupWebsiteLink, startupIndustry, startupLogo,startupDetail

    const tempPath = req.file.path;
    const targetPath = './public/userImages/companylogos/' + startupCIN + path.extname(req.file.originalname).toLowerCase();
    console.log(targetPath);
    console.log(tempPath);

    fs.rename(tempPath, targetPath, (err) => {
        if(err){
            console.log(err);
        }else{
        
            db.validateEmail(startupEmail,() => {
                db.insertNewStartup(startupEmail, startupName, startupCIN, startupPass,startupStage, 
                                    startupNature, startupWebLink, startupIndustry, targetPath, startupDetails, 
                () => {
                    
                    db.insertFounders(startupEmail, founders, () => {
                        db.insertInternPos(startupEmail, internPosNeeded, () => {
                            res.redirect('/');
                        });
        
                    });
                });
            });        
        
        }
    });
});

module.exports = router;