var mongoose = require('mongoose');
var Schema = mongoose.Schema
var Account = require('./account');
var Report = require('./report');

var groupSchema = new Schema({
	name: String,
	description: String,
	members: [{type: Schema.Types.ObjectId, ref: "Account"}],
	reports: [{type: Schema.Types.ObjectId, ref: "Report"}],
	password: String,
	admin: Schema.Types.ObjectId 
});

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
