const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers/routes');


const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.engine(
    '.hbs',
    exphbs({
      extname: '.hbs',
    })
);

app.set('view engine', '.hbs');
app.use('/', routes);

/*
con.connect((err) => {
    if(err) throw err;
    console.log("Connected");

    con.query('SELECT * FROM Intern;', (err, result) => {
        if(err) throw err;

        console.log(result);
    });
});
*/

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});