var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Group = require('./group');

var accountSchema = new Schema({

	email: String,
	admin: Boolean,
	username: String, 
	password: String,
	groups: [{type: Schema.Types.ObjectId, ref: "Group"}]
});

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;
