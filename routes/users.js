var express = require('express');
var router = express.Router();

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

module.exports = router;
