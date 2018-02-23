'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbroute = require('./routes/dbroute');
const logRoute = require('./routes/logs');
const userroute = require('./routes/users');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const expressValidator = require('express-validator');
const insightroute = require('./routes/insightroute');
const mongoose = require('mongoose');
const DBURL = require('./config');
const fs = require('fs');
const https = require('https');
let sslPath;
try { 
  sslPath = '/etc/letsencrypt/live/drystore.haus.world/';
  fs.readFileSync('/etc/letsencrypt/live/drystore.haus.world/privkey.pem');
} catch(e) {
  console.log('sslPath not found, running in dev environment');
  sslPath = null;
}


// Connect to DB 
mongoose.connect(DBURL, () => {
  console.log('Connected to Db');
});
  
const http = require('http'); 
http.createServer(app).listen(80);

// Check if SSLpath is defined (if running in production environment) and run Https server
if (sslPath) {
  const forceSsl = require('express-force-ssl');
  app.use(forceSsl);
  let options = {
    key:fs.readFileSync(sslPath + 'privkey.pem'),
    cert: fs.readFileSync(sslPath + 'fullchain.pem')
  };
  https.createServer(options,app).listen(443);
} 




// Bring in Models for queries
let Item = require('./models/itemModel');
let User = require('./models/userModel');
let Note = require('./models/noteModel');

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
  saveUninitialized: true,
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
  });

});

// Notes Route
app.get('/notes', (req,res) => {
  if (req.isAuthenticated()) {
    Note.find({}, (err,notes) => {
      if(err) {
        console.log(err);
      } else {
        res.render('notes', {
          notes:notes
        });
      }
    });
  } else {
    res.render('notauthenticated');
  }
});

app.get('/notes/edit_note/:id', (req,res) => {
  if (req.isAuthenticated()) {
    Note.findById({_id:req.params.id}, (err,note) => {
      if(err) {
        console.log(err);
      } else {
        res.render('edit_note', {
          note:note,
        });
      }
    });
  } else {
    res.render('notauthenticated');
  }
});


// Notes Post Route
app.post('/notes', (req,res) => {
  if (req.user.role === 'Visitor') {
    res.render('visitor');
  } else {
    if (req.isAuthenticated()) {
      let noteObj = new Note;
      noteObj.subject = req.body.subject;
      noteObj.body = req.body.body;
      noteObj.tags = req.body.tags;

      noteObj.save((err) => {
        if(err) {
          console.log(err);
        } else {
          Note.find({}, (err,notes) => {
            if(err) {
              console.log(err);
            } else {
              res.redirect('/notes');
            }
          });
        }
      });
    }}
});

app.get('/notes/view_note/:id', (req,res) => {
  if (req.isAuthenticated()) {
    Note.findById({_id:req.params.id}, (err,notes) => {
      if(err) {
        console.log(err);
      } else {
        let formattedBody = notes.body.replace(/\n/g, '\n');
        res.render('view_note', {
          notes:notes,
          formattedBody:formattedBody,
          success:'Item Removed'
        });
      }
    });
  } else {
    res.render('notauthenticated');
  }
});


app.get('/notes/confirmdelete/:id', (req,res) => {
  if (req.isAuthenticated()) {
    Note.findById({_id:req.params.id}, (err,note) => {
      if (err) {
        console.log(err);
      } else {
        res.render('confirmdeletenote', {
          note:note
        });
      }
    });
  } else {
    res.render('notauthenticated');
  }
});

// Delete note Route
app.post('/notes/delete/:id', (req,res) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'Visitor') {
      res.render('visitor');
    } else {
      Note.findByIdAndRemove({_id:req.params.id}, (err) => {
        if(err) {
          console.log(err);
        } else {
          Note.find({}, (err,notes) => {
            if(err) {
              console.log(err);
            } else {
              res.render('notes', {
                notes:notes
              });
            }
          }
          );
        }
      });
    }
  } else {
    res.render('notauthenticated');
  }
});

// Edit Note Route

app.post('/notes/edit_note/update/:id', (req,res) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'Visitor') {
      res.render('visitor');
    } else {
      let note = {};
      note.subject = req.body.subject;
      note.body = req.body.body;
      let query = {_id:req.params.id};
      Note.update(query,note,(err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/notes');
        }
      });
    }
  } else {
    res.render('notauthenticated');
  }
});

app.get('/about', (req,res) => {
  res.render('about');
});

// DB Route
app.use('/db', dbroute);

// Users Route
app.use('/users', userroute);

// Insights Route
app.use('/insights', insightroute);

// Logs Route
app.use('/logs', logRoute);

// Error Handling
app.get('*', (req,res) => {
  res.render('error.pug');
});



// Start Server
// app.listen(80);
// console.log('Now listening on Port 80!');
