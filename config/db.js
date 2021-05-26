const mysql = require('mysql')

const con = mysql.createConnection({
    host: "localhost",
<<<<<<< HEAD
    user: "root",
    password: "",
    database: 'IWPDB1',
=======
    user: "god",
    password: "god",
    database: 'IWPDB',
>>>>>>> completed
    multipleStatements: true
});

module.exports = con