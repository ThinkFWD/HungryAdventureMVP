var express = require('express');
var utils = require('../../utils');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../models/user.js');
var trips = require('../models/travel.js');
var bcrypt = require ('bcryptjs');


// ++++++ Routes ++++++

router.get('/test', function(req,res) {
	console.log('REQ', req.query);
	trips.TripOptions.find({ price: req.query.budget }).exec(function (err, trip) {
		if (!trip){
			console.log('SORRY NO ENTRY', trip);
		} else {
			res.send(trip);
		}
	});

});


router.get('/', function(req,res) {
	res.render('../views/index.jade');
});

router.get('/register', function(req,res) {
	res.render('../views/register.jade', {csrfToken: req.csrfToken()});
});

router.post('/register', function (req,res) {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(req.body.password, salt);

	var user = new models.User ({
		firstName: req.body.firstName, 
		lastName: req.body.lastName,
		email: req.body.email,
		password: hash, 
	});

	user.save(function(err){
		if(err){
			var errorMsg = 'Oh no, you screwed up, please try again!';
			if (err.code === 11000){ // mongo returns 11000 if not unique
				errorMsg = 'Nice try buddy, but that email has already been taken, try again!';
			}
			res.render('register.jade', {error: error});
		} else {
			utils.createUserSession(req, res, user);
			res.redirect('/dashboard');
		}
	});


});

router.get('/login', function(req,res) {
	res.render('../views/login.jade', {csrfToken: req.csrfToken() });
});


//User logs into their account and will be sent to dashboard.
router.post('/login', function (req,res){
	models.User.findOne({email:req.body.email}, 'firstName lastName email password data', function (err, user) {
		if (!user){
			res.render('../views/login.jade', {error: "Nice try, wrong email / password", csrfToken: req.csrfToken() });
		} else {
			if (bcrypt.compareSync(req.body.password, user.password)){
				utils.createUserSession(req, res, user);
				res.redirect('/dashboard');
			} else {
				res.render('../views/login.jade', { error: "Nice try, wrong email / password", csrfToken: req.csrfToken() });
			}
		}
	});
});



router.get('/dashboard', utils.requireLogin, function(req,res) {
	res.render('../views/dashboard.jade');
});

// router.get('/test', function(req,res){
// 	console.log('HELLO');
// 	res.render('test.html');
// });


router.get('/logout', function (req,res) {
	if(req.session){
		req.session.reset();
	}
	res.redirect('/');
});




module.exports = router;