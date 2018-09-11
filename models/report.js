var mongoose = require('mongoose');
var Account = require('./account');
var Group = require('./group');

var Schema = mongoose.Schema;
var reportSchema = new Schema({
	submittedBy: [{Schema.Types.ObjectId, ref: 'Account'}],
	belongsTo: [{Schema.Types.ObjectId, ref: 'Group'}],
	submittedOn: Date,
	WVHT: Number,
	SwH: Number,
	SwP: Number,
	SwD: String,
	WWH: Number,
	WWP: Number, 
	WWD: String,
	STEEPNESS: String,
	APD: Number
	WDIR: String,
	WSPD: Number,
	GST: Number
});

var Report = mongoose.model('Report', reportSchema);

module.exports = Report;
