const { truncate } = require("fs");

function getHeaderLoginData(ses){
    if(ses === undefined || ses.email === undefined){
        return {
            link: "/login",
            label: "Login"
        };
    }else {
        return {
            link: "/logout",
            label: "Logout"
        };
    }
}

function getCardsUserType(ses){
    if(ses !== undefined && ses.email !== undefined){
        if(ses.type === "intern"){
            return {
                display: true,
                link: "/applyAsIntern",
                label: "Apply for internship"
            }
        }else if (ses.type === "investor"){
            return {
                display: true,
                link: "/applyAsInvestor",
                label: "Invest"
            }
        }else if (ses.type === "startup") {
            return {
                display: false
            }
        }
    }
    
    throw new Error("Invalid call");
}


module.exports = {
    getHeaderLoginData: getHeaderLoginData,
    getCardsUserType: getCardsUserType
}