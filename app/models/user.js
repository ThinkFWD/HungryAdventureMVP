var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// USER MODELS
// How we create, edit, delete and retrieve user account via MongoDB

module.exports.User = mongoose.model('user', new Schema ({

	id: ObjectId,
	firstName: 	{type: String, required: '{PATH} is required.'}, 
	lastName: 	{type: String, required: '{PATH} is required.'},
	email: 		{type: String, required: '{PATH} is required.', unique:true},
	password: 	{type: String, required: '{PATH} is required.'},
	data: 		Object,

}));
