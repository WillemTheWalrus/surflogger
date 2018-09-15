var Account = require('../models/account');
var db = require('../dbconnect');

exports.login_auth = function(req, res, next) {
	res.render('home');
};


exports.account_create = function(req, res, next) {

	var postUsername = req.body.username;
	var postPassword = req.body.password;

	var accountObject = new Account({ username: postUsername, password: postPassword});

	accountObject.save(function(err) {
		if(err){
			res.send(err);
		}
		else{
			res.send('success');
		}
	});
	

};


