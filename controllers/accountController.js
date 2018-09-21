var Account = require('../models/account');
var db = require('../dbconnect');
const {body, validationResult} = require('express-validator/check');
const { sanitizeBody } = require('express-validator');




exports.login_auth = function(req, res, next) {
	Account.findOne({'username' : req.body.username}, 'username password' , function(err, results){
		if(err){
			res.send(error);
		}
		else{
			if(req.body.password == results.password){

				//create a random number as our session ID and store it in a cookie
				//Everytime we go to a new page after logging in we will check to make sure the 
				//session id in our url matches the stored session ID in our cookie
				
				var sessionID = Math.floor((Math.random()*10000000)+1);
				var cookieName = req.body.username + '::session';
				
				res.cookie(cookieName, sessionID, {expire: 360000 + Date.now()});

				

				
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


