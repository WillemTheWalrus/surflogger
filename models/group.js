var mongoose = require('mongoose');
var Schema = mongoose.Schema

var groupSchema = new Schema({
	name: String,
	members: [Schema.Types.ObjectId],
	reports: [Schema.Types.ObjectId],
	password: String
});


