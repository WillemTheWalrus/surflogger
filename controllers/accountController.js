var Account = require('../models/account');

exports.login_auth = function(req, res, next) {
	res.render('home');
});


exports.account_create = function(req, res, next) {
	res.render('createAccount');
});


