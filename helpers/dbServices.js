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

module.exports = {
    validateEmail: validateEmail,
    insertNewInvestor: insertNewInvestor
};