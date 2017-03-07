var morgan = require('morgan');
var bodyParser = require('body-parser');
var express = require ('express');
var mongoose = require ('mongoose');
var csrf = require('csurf');
var session = require('client-sessions');
var middleware = require('./app/middleware/middleware.js');
var key = require ('./lib/config.js');




// Create and Initilize 
module.exports.createApp = function (){
// @returns {Object} app - An Express object
    

	// connect to mongo
	// mongoose.connect('mongodb://localhost/HungryAdventure');
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://mike:mike@ds119810.mlab.com:19810/travel-data');
	var app = express();

    app.use(express.static(__dirname + '/views'));

	
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
		lastName: user.lastName, 
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

/*


	div(ng-controller="next-update-stats-controller")

	p See global upgrade statistics for a package
	input(type="text", placeholder="package name", ng-model="packageName" title="Enter package module to see update statistics")

	button.btn(ng-click="loadStats()" title="click to search") Load

	ul
		li(ng-repeat="update in updates").{{update.name}} {{update.from}} -> {{update.to}}{{update.probability | number:0}}%{{update.success}} successful{{update.failure}} failed
	
	h2 GET routes
*/


/*

	script.
		var app = angular.module('myApp', []);
		app.controller('todoCtrl', function($scope) {$scope.todoList = [{todoText:'Clean House', done:false}];

		$scope.todoAdd = function() {
			$scope.todoList.push({todoText:$scope.todoInput, done:false});
			$scope.todoInput = "";
		};
		
		$scope.remove = function() {
		var oldList = $scope.todoList;
			$scope.todoList = [];
			angular.forEach(oldList, function(x) {
			if (!x.done) 
				$scope.todoList.push(x);
				console.log('hi');
			});
		};

		});


*/