const { truncate } = require("fs");
const { get } = require("https");


function getAccountData(ses){
    if(ses.type === "intern"){
        return{
            display: true,
        };

    }else if(ses.type === "investor"){
        return{
            display: true,
        };

    }else if(ses.type === "startup"){
        return{
            display: true,
        };

    }else {
        return { display:false };
    }
}

function getHeaderLoginData(ses){
    let accData = getAccountData(ses);

    if(ses === undefined || ses.email === undefined){
        return {
            link: "/login",
            label: "Login",
            accData: accData
        };
    }else {
        return {
            link: "/logout",
            label: "Logout",
            accData: accData
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