let express = require('express');
let router = express.Router();
let User = require('../models/userModel');
let LocalStrategy = require('passport-local').Strategy;
let passport = require('passport');

// GET Routes 
router.get('/login', (req,res) => {
        res.render('login');
    }
);


router.get('/register', (req,res) => {
	res.render('register');
});

router.get('/confirmlogout', (req,res) => {
	res.render('confirmlogout');
});

// POST Routes

router.post('/register', (req,res) => {
	let name = req.body.name;
	let email = req.body.email;
	let password = req.body.password;
	let password2 = req.body.password2;

	//Validation
	req.checkBody('name', 'Name is Required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Please enter a valid email address').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
	
	let errors = req.validationErrors();


	if(errors) {
		res.render('register', {
			errmessage: 'There was a validation problem with the information you entered. Please try again'
		});
	} else {
		let newUser = new User({
			name:name,
			email:email,
			password:password
		});

	User.createUser(newUser, (err,user) => {
		if(err) throw err;
		console.log(user);
	});
	console.log('User is registered');
	res.render('login', {
		success: 'User was Created!'
	});

	}
});


passport.use(new LocalStrategy(
(email, password, done) => {
	User.getUserByEmail(email, (err,user) => {
		if(err) {
			console.log(err)
		}
		if(!user){
			return done(null,false,{message: 'Unknown User'});
		}
	User.comparePassword(password, user.password, (err, isMatch) => {
		if(err) throw err;
		if(isMatch){
			return done(null,user);
		} else {
			return done(null, false, {message: 'Invalid Password'});
		}
	});
  });
}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
	  done(err, user);
	});
  });


  router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash:false}),
  (req, res) => {
	res.redirect('/');
  //   res.redirect('/users/' + req.user.username);
  });
  
  
  router.get('/logout', (req,res) => {
	 	req.logout();
		res.render('home', {
			success: 'You have been Logged out.'
		});
  });
      
  

module.exports = router;
