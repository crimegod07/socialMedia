const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

//extract style and script sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes'));

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({

   name: 'codial',
   //To Do change the secret before deployment
   secret: 'blah something',
   saveUninitialized: false,
   resave: false,
   cookie: {
       maxAge: (1000 * 60 * 100)
   }
}))

app.use(passport.initialize());
app.use(passport.session());


app.listen(port, function(err){
    if(err){
        console.log('Error', err)
        console.log(`Error in running the server: $(err)`);
    }

    console.log(`server is running on port: ${port}` );
})