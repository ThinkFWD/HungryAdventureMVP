var morgan = require('morgan');
var model = require('../models/user.js');
var utils = require('../../utils.js');
var bodyParse = require('body-parser');



// Simple Authentication Middleware for express
module.exports.Auth = function (req, res, next){
	if(req.session && req.session.user){
		model.User.findOne({ email: req.session.user.email}, 'firstName LastName email data', function(err,user){
			if (user){
				utils.createUserSession(req,res,user);
			}
			next();
		});
	} else {
		next();
	}
};
