var Account = require('../models/account');
var db = require('../dbconnect');
var session = require('express-session');
const {body, validationResult} = require('express-validator/check');
const { sanitizeBody } = require('express-validator');

exports.login_auth = function(req, res, next) {
	Account.findOne({'username' : req.body.username}, 'username password' , function(err, results){
		if(err){
			res.send(error);
		}
		else{
			if(req.body.password == results.password){

				//log session id
				console.log(req.session);

				//let user login to home page
				var sessionData = req.session
				sessionData.username  = req.body.username;
				console.log(sessionData.username);
				res.render('home', {username: sessionData.username})

				//store the user object Id for keeping track of what they do in their session
				//this will be used if they create a new group or report
				sessionData.userID = results._id;	
				console.log(sessionData.userID);

				
			}
			else
			{
				res.render('index', { errors: 'Incorrect password' } );
			}	
		}
	});

}

exports.render_home = function(req,res,next) {

}

exports.account_create_page = function(req, res, next) {
	res.render('createAccount');
}
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


