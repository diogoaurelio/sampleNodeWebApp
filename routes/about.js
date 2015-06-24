//about.js

var express = require('express')
var router = express.Router()

/* Get About page */

// Note get '/' because we are already in about.js; if the
// route were to be specified in index.js, then use '/about'
router.get('/', function(req, res, next) {
	res.render('about', { title: 'About'})
})

module.exports = router