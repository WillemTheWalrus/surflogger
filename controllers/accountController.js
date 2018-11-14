var Account = require('../models/account');
var Report = require('../models/report');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


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
			//If the user is not a part of any groups, display a message	
			if(account.groups.length < 1){
				res.render('home', {username: req.user.username, groupNames: false });
			}
			//If the user is a part of groups, show them
			else{
				var groupNames = [];
				//populate the group field for our account object so we can grab the group names
				//and pass it to our home page as an array to be displayed
				Account.findOne({username: req.user.username}).populate('groups' , 'name')
					.exec(function(err, result){
						if(err)
						{
							res.send(err);
						}
						else{

							var groupnames = [];
							//get the names of all the groups to display on the home page
								
							var i;
							for(i = 0; i < result.groups.length; i++){
								groupnames[i] = result.groups[i].name;
							}
							
							Report.find({submittedBy: ObjectId(account._id) } , function(err, foundReports){
								if(err){
									res.send(err);
								}
								else{
									console.log(foundReports.length);
									if(foundReports.length < 1){
										res.render('home', {username: req.user.username, groupNames: groupnames, reports: false});
									}
									else{
										res.render('home', {username: req.user.username, groupNames: groupnames, reports: foundReports});
									}
								}
							});
							
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


