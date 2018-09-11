var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var accountSchema = new Schema({
	email: String,
	admin: Boolean,
	username: String, 
	password: String,
	groups: [Schema.Types.ObjectId]
});

accountModel = mongoose.model('accountModel', accountSchema);

module.exports = accountModel;
