const express = require('express');
const con = require('./config/db');

const app = express();

con.connect((err) => {
    if(err) throw err;
    console.log("Connected");

    con.query('SELECT * FROM Intern;', (err, result) => {
        if(err) throw err;

        console.log(result);
    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});