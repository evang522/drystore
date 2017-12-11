let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let dbConnect = require('./db/dbconnect');
let dbroute = require('./routes/dbroute');
let userroute = require('./routes/users');
let cookieParser = require('cookie-parser');
let LocalStrategy = require('passport-local').Strategy;
let session = require('express-session');
let passport = require('passport');
let expressValidator = require('express-validator');
let insightroute = require('./routes/insightroute')

// Bring in Models for queries
let Item = require('./models/itemModel');
let User = require('./models/userModel');

// Set View Engine 
app.set('view engine', 'pug');
app.set('views', './views');

// Set Public Folder
app.use(express.static('public'));

//Body Parser Middleware
app.use(bodyParser.urlencoded({
    extended:false
}));

//Cookie Parser Middleware
app.use(cookieParser());

// Express Session Middleware
app.use(session({
    secret: 'secret',
    saveuninitialized: true,
    resave: true
}));


// Validation
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

//Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

//Global Variables 
app.use((req,res,next) => {
    res.locals.user = req.user || null;
    next();
});



// Home Route
app.get('/', (req,res) => {
    Item.find({}, (err,items)=> {
        if(err) {
            console.log(err);
        } else { 
            res.render('home.pug', {
                items:items
            });
        }
    })

});

// DB Route
app.use('/db', dbroute);

// Users Route
app.use('/users', userroute);

// Insights Route
app.use('/insights', insightroute)

// Error Handling
app.get('*', (req,res) => {
    res.render('error.pug');
});



// Start Server 
app.listen(1000);
console.log('Now listening on Port 1000!');