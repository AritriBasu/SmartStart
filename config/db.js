const mysql = require('mysql')

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'IWPDB1',
    multipleStatements: true
});

module.exports = con