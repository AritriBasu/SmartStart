const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const routes = require('./controllers/routes');
const signup = require('./controllers/signup');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

app.engine(
    '.hbs',
    exphbs({
      extname: '.hbs',
    })
);

app.set('view engine', '.hbs');
app.use('/', routes);
app.use('/signup', signup);


app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});