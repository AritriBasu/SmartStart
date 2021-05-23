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

module.exports = {
    validateEmail: validateEmail,
    insertNewInvestor: insertNewInvestor,
    authenticateUser: authenticateUser
};