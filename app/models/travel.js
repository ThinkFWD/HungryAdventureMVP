var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports.TripOptions = mongoose.model('mock-data', new Schema ({

	id: ObjectId,
	price: Number, 
	departure_location: String, 	
	arrival_location: String, 	
	lengthOfStay: Number,
	image: String 		

}));