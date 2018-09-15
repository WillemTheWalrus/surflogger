var mongoose = require('mongoose');
var Schema = mongoose.Schema
var Account = require('./account');
var Report = require('./report');

var groupSchema = new Schema({
	name: String,
	members: [{type: Schema.Types.ObjectId, ref: "Account"}],
	reports: [{type: Schema.Types.ObjectId, ref: "Report"}],
	password: String
});

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
