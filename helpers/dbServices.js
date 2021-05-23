const con = require('../config/db');


function validateEmail(email){
    let query = 
    "SELECT COUNT(allEmails) FROM ((SELECT startupEmail as allEmails FROM Startup UNION SELECT companyEmail as allEmails FROM Investor UNION  SELECT internEmail as allEmails FROM Intern) as emails) WHERE allEmails  = ?;"
    
    con.query(query, [email], (error, results) =>{
        if(error){
            console.log(error);
            return false;
        }

        if(results.length > 0){
            console.log(results);
            return true;
        }
    });


    return false;
}

module.exports = {
    validateEmail: validateEmail
};