var express = require('express');
var router = express.Router();

var User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

});

// GET users/register
router.get('/register', function(req, res, next) {
	res.render('register', { //load register view
		'title' : 'Register' //pass in parameter
	})
})

router.get('/login', function(req, res, next) {
	res.render('login', { 'title': 'Login'})
})

//POST users/register
router.post('/register', function(req, res, next) {
  //retrieve form values
  var fname = req.body.fname
  var lname = req.body.lname
  var email = req.body.email
  var password = req.body.password
  var confirmpassword = req.body.confirmpassword

  if( req.files.profileimage) {
    console.log('Uploading file...')
    //file info
    var profileImageOriginalName = req.profileimage.originalname
    var profileImageOriginalName = req.profileimage.name
    var profileImageOriginalName = req.profileimage.mimetype
    var profileImageOriginalName = req.profileimage.path
    var profileImageOriginalName = req.profileimage.extension
    var profileImageOriginalName = req.profileimage.size

  } else {
    //if no pic is uploaded
    var progileImageName = 'noImage.png'
  }

  //Form validation
  req.checkBody('fname', 'First Name field is required').notEmpty()
  req.checkBody('lname', 'Last Name field is required').notEmpty()
  req.checkBody('email', 'Email not valid').isEmail()
  req.checkBody('password', 'Password field is required').notEmpty()
  req.checkBody('confirmpassword', 'Confirm password needs to be the same').equals(req.body.password)

  // Check for errors
  var errors = req.validationErrors()
  console.log(errors)
  if(errors) {
    console.log(errors)
    res.render('register', {
      errors: errors,
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      confirmpassword: confirmpassword
    })
  } else {
    var newUser = new User({
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      profileimage: progileImageName
    })
    // Create User
    User.createUser(newUser, function(err, user) {
      if(err) throw err
      console.log(user)
    })
    req.flash('success', 'You are now registered and may log in')
    res.location('/')
    res.redirect('/')
  }


})



module.exports = router;
