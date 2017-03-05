var model = require('../models/user.js');
var utils = require('../../utils.js');



// Simple Authentication Middleware for express
module.exports.Auth = function (req, res, next){
	if(req.session && req.session.user){
		models.User.findOne({ email: req.session.user.email}, 'firstName LastName email data', function(err,user){
			if (user){
				utils.createUserSession(req,res,user);
			}
			next();
		});
	} else {
		next();
	}
};