var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var flash = require('connect-flash');

//var port = process.env.port || 8080;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register',{
  	'title': 'Register'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login',{
  	'title': 'Login'
  });
});

router.post('/register',function(req, res, next){
	// Get Form Values
	var fname = req.body.fname;
  var lname = req.body.lname;
	var email = req.body.email;
	var password = req.body.password;
	var confirmpassword = req.body.confirmpassword;

	// Check for Image Field
	if(req.files.profileimage){
		console.log('Uploading File...');

		// File Info
		var profileImageOriginalName 	= req.files.profileimage.originalname;
		var profileImageName 			= req.files.profileimage.name;
		var profileImageMime 			= req.files.profileimage.mimetype;
		var profileImagePath 			= req.files.profileimage.path;
		var profileImageExt 			= req.files.profileimage.extension;
		var profileImageSize 			= req.files.profileimage.size;
	} else {
		// Set a Default Image
		var profileImageName = 'noimage.png';
	}

	// Form Validation
	req.checkBody('fname','First Name field is required').notEmpty();
  req.checkBody('lname','Last Name field is required').notEmpty();
	req.checkBody('email','Email field is required').notEmpty();
	req.checkBody('email','Email not valid').isEmail();
	req.checkBody('password','Password field is required').notEmpty();
	req.checkBody('confirmpassword','Passwords do not match').equals(req.body.password);

	// Check for errors
	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors: errors,
			fname: fname,
      lname: lname,
			email: email,
			password: password,
			confirmpassword: confirmpassword
		});
	} else {
		var newUser = new User({
      fname: fname,
      lname: lname,
      email: email,
			password: password,
			profileimage: profileImageName
		});

			// Create User
	User.createUser(newUser, function(err, user){
		if (err) throw err;
		console.log(user);
	});


		// Success Message
		req.flash('success','You are now registered and may log in');

		res.location('/');
		res.redirect('/');
	}
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//http://www.scotchmedia.com/tutorials/express/authentication/2/04
passport.use(new LocalStrategy(
  { usernameField: 'email' }, //have to specify this in passport if not Auth with username!!
	function(email, password, done){
		User.getUserByEmail(email, function(err, user){
			if(err) throw err;
			if(!user){
				console.log('Unknown User');
				return done(null, false,{message: 'Unknown User'});
			}
      //candidatePassword, user.password in DB, isMatch
			User.comparePassword(password, user.password, function(err, isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null, user);
				} else {
					console.log('Invalid Password');
					return done(null, false, {message:'Invalid Password'});
				}
			});
		});
	}
));

router.post('/login', passport.authenticate('local',{ failureRedirect:'/users/login', failureFlash:'Invalid username or password'}), function(req, res){
  // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
  console.log('Authentication Successful');
	req.flash('success', 'You are logged in');
  //res.render('/', { messages: req.flash('success')})
	res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('Success', 'You have logged out')
  //res.render('users/login', { messages: req.flash('success')})
  res.redirect('users/login')
})

module.exports = router;
