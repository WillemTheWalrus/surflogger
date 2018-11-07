var mongoose = require('mongoose');
var Account = require('./account');
var Group = require('./group');

var Schema = mongoose.Schema;
var reportSchema = new Schema({
	submittedBy: {type: Schema.Types.ObjectId, ref: 'Account'},
    belongsTo: {type: Schema.Types.ObjectId, ref: 'Group'},
    location: String,
    submittedOn: Date,
    buoyReportDate: Date,
	WVHT: Number,
	SwH: Number,
	SwP: Number,
	SwD: String,
	WWH: Number,
	WWP: Number, 
	WWD: String,
	STEEPNESS: String,
    APD: Number,
    MWD: Number,
	WDIR: String,
	WSPD: Number,
    GST: Number,
    description: String,
	rating: String,
	
});

var Report = mongoose.model('Report', reportSchema);

module.exports = Report;
