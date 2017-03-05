var express = require('express');
var utils = require('../../utils');
var router = express.Router();




// ++++++ Routes ++++++

router.get('/', function(req,res){
	res.render('../views/index.jade');
});

router.get('/register', function(req,res){
	res.render('../views/register.jade');
});

router.get('/login', function(req,res){
	res.render('../views/login.jade');
});

router.get('/dashboard', function(req,res){
	res.render('../views/dashboard.jade');
});

module.exports = router;