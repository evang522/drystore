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
// let fs = require('fs');
// let https = require('https');
// let sslPath = '/etc/letsencrypt/live/drystore.haus.world/';

let http = require('http'); 
http.createServer(app).listen(80);
// let forceSsl = require('express-force-ssl');
 

// app.use(forceSsl);


// let options = {
// 	key:fs.readFileSync(sslPath + 'privkey.pem'),
//     cert: fs.readFileSync(sslPath + 'fullchain.pem')
//  }

//  https.createServer(options,app).listen(443);


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
        })
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
        })
    } else {
        res.render('notauthenticated');
    }
})


// Notes Post Route
app.post('/notes', (req,res) => {
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
            })
        }
    })
    }
});

app.get('/notes/view_note/:id', (req,res) => {
    if (req.isAuthenticated()) {
    Note.findById({_id:req.params.id}, (err,notes) => {
        if(err) {
            console.log(err);
        } else {
            let formattedBody = notes.body.replace(/\n/g, "\n");
            res.render('view_note', {
                notes:notes,
                formattedBody:formattedBody,
                success:'Item Removed'
                });
            }
        })
    } else {
        res.render('notauthenticated');
    }
})


app.get('/notes/confirmdelete/:id', (req,res) => {
    Note.findById({_id:req.params.id}, (err,note) => {
        if (err) {
            console.log(err);
        } else {
        res.render('confirmdeletenote', {
            note:note
        });
        }
    })
});

// Delete note Route
app.post('/notes/delete/:id', (req,res) => {
    Note.findByIdAndRemove({_id:req.params.id}, (err) => {
        if(err) {
            console.log(err);
            } else {
                Note.find({}, (err,notes) => {
                    if(err) {
                        console.log(err)
                    } else {
                        res.render('notes', {
                            notes:notes
                        })
                    }
                }
            )
        }
    })
});

// Edit Note Route

app.post('/notes/edit_note/update/:id', (req,res) => {
    if (req.isAuthenticated()) {
        let note = {};
        note.subject = req.body.subject;
        note.body = req.body.body;
        let query = {_id:req.params.id};
        Note.update(query,note,(err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/notes')
            }
        })
    } else {
        res.redirect('notes');
    }
});

app.get('/about', (req,res) => {
  res.render('about');
})

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
// app.listen(80);
// console.log('Now listening on Port 80!');
