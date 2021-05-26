const con = require('../config/db');

function validateEmail(email, next){
    let query = "SELECT COUNT(allEmails) FROM ((SELECT startupEmail as allEmails FROM Startup UNION SELECT companyEmail as allEmails FROM Investor UNION  SELECT internEmail as allEmails FROM Intern) as emails) WHERE allEmails  = ?;";
    con.query(query,[email], function(error, result){
        if (error) {
            console.log(error);
        }
        else{
            if(result.length > 0){
                if(result[0]["COUNT(allEmails)"] === 0){
                    next();
                }          
            }
        }
    })
}


function insertNewInvestor(companyName, companyEmail, companyType, companyPass, next){
    let query = "INSERT INTO Investor VALUES (?, ?, ?, ?);";

    con.query(query, [companyEmail, companyType, companyName, companyPass], function(error) {
        if(error){
            console.log(error);
        }else{
            next();
        }
    });
}


function insertNewIntern(internEmail, internPassword, internName, internDOB, qualification, graduationYear, 
                        college, collegeDegree, department, next){
    let query = "INSERT INTO Intern VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);";

    con.query(query, [internEmail, internPassword, internName, internDOB, 
                      qualification, graduationYear, college, collegeDegree, department], 
        function(error) {
            if(error){
                console.log(error);
            }else {
                next();
            }
        }
    );
}

function insertNewStartup(startupEmail, startupName, startupCIN, startupPassword, startupStage,
                          startupNature, startupWebsiteLink, startupIndustry, startupLogo,
                          startupDetails, next){

    let query = "INSERT INTO Startup VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

    
    con.query(query, [startupEmail, startupName, startupCIN, startupPassword, startupStage,
                      startupNature, startupWebsiteLink, startupIndustry, startupLogo, 
                      startupDetails], 
        
        function(error){
            if(error){
                console.log(error);
            }else {
                next();
            }
        }


    );
}

function returnStartup(email, type, next){
    let query;
    if(type === "investor"){
        query = 
        "SELECT startupLogo, startupEmail, startupStage, startupIndustry, startupWebsiteLink FROM Startup WHERE startupEmail NOT IN (SELECT s.startupEmail FROM Startup s INNER JOIN InvestsIn ii ON s.startupEmail = ii.startupEmail WHERE ii.companyEmail = ?);";    
    }else if (type === "intern"){
        query = 
        "SELECT startupLogo, startupEmail, startupStage, startupIndustry, startupWebsiteLink FROM Startup WHERE startupEmail NOT IN (SELECT s.startupEmail FROM Startup s INNER JOIN AppliesTo at2 ON s.startupEmail = at2.startupEmail WHERE at2.internEmail = ?);";    
    } 

    con.query(query, [email], function(err, result){
        if(err){
            console.log(err);
        }else{
            next(result);
        }
    });
}

function returnStartupDetails(email, next){

    let query = 
    "SELECT startupName, startupEmail, startupCIN, startupStage, startupNature, startupWebsiteLink, startupDetails FROM Startup where startupEmail=?;";
    con.query(query, [email],function(err, result){
        if(err){
            console.log(err);
        }else{
            next(result);
        }
    });
}

function returnInternDetails(email, next){

    let query = 
    "SELECT internName, internEmail, college, department, qualification, collegeDegree, internDOB, graduationYear from INTERN where internEmail=?;";
    con.query(query, [email],function(err, result){
        if(err){
            console.log(err);
        }else{
            next(result);
        }
    });
}


function returnInvestor(email,next){

    let query = 
    "SELECT companyEmail, companyType, companyName FROM Investor where companyEmail=?";
    con.query(query,[email],function(err, result){
        if(err){
            console.log(err);
        }else{
            next(result);
        }
    });
}


function insertFounders(startupEmail, founders, next){
    let query = "INSERT INTO StartupFounders VALUES ";
    

    for(let i = 0; i < founders.length - 1; i++){
        query += `("${founders[i]}", "${startupEmail}"), `;
    }

    query += `("${founders[founders.length - 1]}", "${startupEmail}");`;

    con.query(query, function(error) {
        if(error){
            console.log(error);
        }else {
            next();
        }
    });
}

function insertInternPos(startupEmail, internPosNeeded, next){
    let query = "INSERT INTO InternPosNeeded VALUES ";
    
    for(let i = 0; i < internPosNeeded.length - 1; i++){
        query += `("${startupEmail}", "${internPosNeeded[i]}"), `;
    }

    query += `("${startupEmail}", "${internPosNeeded[internPosNeeded.length - 1]}");`;


    con.query(query, function(error) {
        if(error){
            console.log(error);
        }else {
            next();
        }
    });

}

function authenticateUser(email, password, next) {
    let query = 
    "SELECT * FROM ((SELECT internEmail as email, internPassword as password, 'intern' AS ID FROM Intern UNION SELECT companyEmail as email, companyPassword as password,'investor' AS ID FROM Investor UNION SELECT startupEmail as email, startupPassword as password, 'startup' AS ID FROM Startup) as login) WHERE email = ? and password = ?;";
    
    con.query(query, [email, password],function(err, result){
        if(err){
            console.log(err);
        }else{
            if(result.length === 1){
                next(result[0]["email"], result[0]["ID"]);
            }
        }
    });
}

function insertInternApplication(internEmail, startupEmail, DOA, next){
    let query =
    "INSERT INTO AppliesTo VALUES (?, ?, ?, 'P');" 

    con.query(query, [internEmail, startupEmail, DOA], function(err) {
        if(err){
            console.log(err);
        }else {
            next();
        }
    });
}


function insertInvestApplication(investorEmail, DOI, startupEmail, next){
    let query =
    "INSERT INTO InvestsIn VALUES (?, ?, ?);" 

    con.query(query, [investorEmail, DOI, startupEmail], function(err) {
        if(err){
            console.log(err);
        }else {
            next();
        }
    });
} 

module.exports = {
    validateEmail: validateEmail,
    insertNewInvestor: insertNewInvestor,
    authenticateUser: authenticateUser,
    insertNewIntern: insertNewIntern,
    insertNewStartup: insertNewStartup,
    insertFounders: insertFounders,
    insertInternPos: insertInternPos,
    returnStartup: returnStartup,
    returnInvestor: returnInvestor,
    insertInternApplication: insertInternApplication,
    insertInvestApplication: insertInvestApplication,
    returnStartupDetails:returnStartupDetails, 
    returnInternDetails:returnInternDetails
};