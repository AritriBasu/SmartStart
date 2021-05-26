const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const uuid = require('uuid').v4;
const session = require('express-session');


const routes = require('./controllers/routes');
const signup = require('./controllers/signup');
const login = require('./controllers/login');

const app = express();

app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.use(session(
    {
        genid: function (req) {
            return uuid();
        },
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 600000
        }
    }
)

);

app.engine(
    '.hbs',
    exphbs({
        extname: '.hbs',
    })
);

app.use('/', routes);
app.use('/signup', signup);
app.use('/loginForm/', login);
//app.use('/account',accounts);

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});