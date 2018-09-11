var mongoose = require('mongoose');
var Schema = mongoose.Schema
var Account = require('./account');
var Report = require('./report');

var groupSchema = new Schema({
	name: String,
	members: [{Schema.Types.ObjectId, ref: "Account"}],
	reports: [{Schema.Types.ObjectId, ref: "Report"}],
	password: String
});

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
