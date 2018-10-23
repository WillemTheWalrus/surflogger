var Account = require('../models/account');
var db = require('../dbconnect');
var session = require('express-session');
var Group = require('../models/group');
const {body, validationResult} = require('express-validator/check');
const { sanitizeBody } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


//login using the passport middleware
//define a new LocalStrategy for login authorixation
//code taken from: http://www.passportjs.org/docs/username-password/
exports.passport_login = new LocalStrategy( function(username, password, done) {

	Account.findOne({'username' :username }, 'username password' , function(err, results){
		if(err){
			return done(err);
		}
		if(!results) {
			return done(null, false, {message : 'Username not found'});
		}
		if(results.password != password){
			return done(null, false, { message: 'Incorrect Password'});
		}
		return done(null, results, {message: 'Success!'});
	});
});


exports.render_home = function(req,res,next) {
	Account.findOne({username: req.user.username}, function (err, account) {
		if(err){
			res.redirect('/err/notfound');
		}
		else{
			//stuff all of the group names into an array
			/*
			var groupnames = [];
			var i;
			for(i = 0; i < account.groups.length; i++){
				groupnames[i] = account.groups[i].name;
			}

			res.render('home', {username: req.user.username, groupNames: groupnames});
			*/
			
			if(account.groups.length < 1){
				res.render('home', {username: req.user.username, groupNames: ['You are not in any groups yet' ] });
			}
			else{
				var groupNames = [];
				Account.findOne({username: req.user.username}).populate('groups' , 'name')
					.exec(function(err, result){
						if(err)
						{
							res.send(err);
						}
						else{
							var groupnames = [];
							var i;
							for(i = 0; i < result.groups.length; i++){
								groupnames[i] = result.groups[i].name;
							}
							res.render('home', {username: req.user.username, groupNames: groupnames});
						}
					});

			}
			
		}
	});
}

exports.account_create_page = function(req, res, next) {
	res.render('createAccount');
}
exports.account_create = function(req, res, next) {

	var postUsername = req.body.username;
	var postPassword = req.body.password;


	//check to make sure the username is unique
	
	Account.find({username: postUsername} , function( err, account) {
		if(err){
			console.log(err);
		}
		else{
			//if the username is taken, rerender creation page with error
			if(account.length > 0){
				res.render('createAccount', {errors: 'username already taken'});
			}
			else{
				//if the username is unique, create the account and save it
				var accountObject = new Account({ username: postUsername, password: postPassword});

				accountObject.save(function(err) {
					if(err){
						res.send(err);
					}
					else{
						//redirect back to login page if save is succesful
						res.redirect('/');
					}
				});
			}
		}
	});
};


