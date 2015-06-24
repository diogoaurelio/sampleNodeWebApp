//contact.js
var express = require('express')
var router = express.Router()
var nodemailer = require('nodemailer')

/* Get Contact page */

router.get('/', function(req, res, next) {
	res.render('contact', { title: 'Contacts'})
})

router.post('/send', function(req, res, next) {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'someEmail@gmail.com',
			pass: 'somePassword'
		}
	})
	var mailOptions = {
		from: 'Some Dev Team <dev@mail.com>',
		to: 'sample@mail.com',
		subject: 'Testing',
		text: 'You have a new message submission with following detail: Name: '+req.body.name+
		' Email: '+req.body.email +
		' Message: '+req.body.message,
		html: '<p>You have a new message submission with the following details: </p><ul><li> Name:'+
		req.body.name +'</li><li>Email: '+req.body.email+'</li><li>Message: '+
		req.body.message
	}
	transporter.sendMail(mailOptions, function(err, info) {
		if(err) {
			console.log(err)
			res.redirect('/')
		} else {
			console.log('Message sent: '+info.response)
			res.redirect('/')
		}
	})
})

module.exports = router