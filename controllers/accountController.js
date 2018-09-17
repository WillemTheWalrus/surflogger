var Account = require('../models/account');
var db = require('../dbconnect');
const {body, validationResult} = require('express-validator/check');
const { sanitizeBody } = require('express-validator');



exports.login_auth = function(req, res, next) {
	res.render('home');
};


exports.account_create = function(req, res, next) {

	var postUsername = req.body.username;
	var postPassword = req.body.password;


	//check to make sure the username is unique
	


	var accountObject = new Account({ username: postUsername, password: postPassword});

	accountObject.save(function(err) {
		if(err){
			res.send(err);
		}
		else{
			res.render('index', { success:'Account created successfully!'});
		}
	});
	

};


