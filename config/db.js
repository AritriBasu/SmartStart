const mysql = require('mysql')

const con = mysql.createConnection({
    host: "localhost",
    user: "god",
    password: "god",
    database: 'IWPDB',
    multipleStatements: true
});

module.exports = con