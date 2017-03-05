var express = require ('express');
var mongoose = require ('mongoose');


// Create and Initilize 
module.exports.createApp = function (){
	mongoose.connect('mongodb://localhost/HungryAdventure');
	var app = express();


	//Settings
	app.set('view engine', 'jade');

	//Middleware


	//Routers
	app.use(require('./app/routes/main.js'));
	return app;
};
