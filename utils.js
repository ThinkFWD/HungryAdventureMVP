var morgan = require('morgan');
var bodyParser = require('body-parser');
var express = require ('express');
var mongoose = require ('mongoose');
var csrf = require('csurf');
var session = require('client-sessions');
var middleware = require('./app/middleware/middleware.js');



// Create and Initilize 
module.exports.createApp = function (){
// @returns {Object} app - An Express object

	// connect to mongo
	mongoose.connect('mongodb://localhost/HungryAdventure');
	var app = express();


	//Settings
	app.set('view engine', 'jade');
	app.locals.pretty = true; // un-minifies
	app.use(morgan('dev')); // view get/post requests
	
	//Middleware
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(session({
		cookieName: 'session',
		secret: 'MikeIsAwesome',
		duration: 30 * 60 * 1000,
		activeDuration: 5 * 60 * 1000,
	}));

	app.use(csrf());
	app.use(middleware.Auth);


	//Routers
	app.use(require('./app/routes/main.js'));
	return app;
};


// Store and creaet cookie session
module.exports.createUserSession = function (req, res, user){
// @params {Object} req - The http request object
// @params {Object} res - the http response object
// @params {Object} user - A user Object
	var cleanUser = {
		firstName: user.firstName,
		lastname: user.lastName, 
		email: user.email,
		data: user.data || {}, 
	};

	// set a session cookie with the user obejct (within header)
	req.session.user = cleanUser;
	req.user = cleanUser;
	res.locals.user = cleanUser;
};


module.exports.requireLogin = function (req, res, next){
	if (!req.user){
		res.redirect('/login');
	} else {
		next();
	}
};




//Sometimes need to run this to get Mongo working
//sudo chown -R `id -u` /data/db 