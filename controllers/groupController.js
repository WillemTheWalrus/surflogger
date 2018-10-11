var Group = require('../models/group');
var session = require('express-session');
var Account = require('../models/account');
var ObjectId = require('mongoose').Types.ObjectId;

//render the group creation form
exports.group_create_page = function(req, res, next) {
	res.render('createGroup');
}

//handles the post submit of the group create form
exports.group_create = function(req, res, next) {
	var groupName = req.body.groupName;
	var Description = req.body.description;
	var password = req.body.groupPassword;
	var passwordValidate = req.body.groupValidatePassword;
	console.log('admin of group: ' + req.user.username);	
	if(password == passwordValidate){
		
		//create a new group object and save it
		var groupObject = new Group({name: groupName, description: Description, password: passwordValidate, admin: req.user._id, members: [req.user._id],});
		groupObject.save(function(err) {
			//if there is an error, re render and display the error
			if(err){
				console.log('save error');
				res.render('createGroup', {errors: err});
			}
			//if succesful, save the group the to the user's group list
			else {
				console.log('group saving...');
				Account.findOne({username: req.user.username }, function( err, doc) {
					if(err){
						console.log(err);	
						res.render('createGroup', {errors: err});
					}
					else{
						console.log('account found');


						//if the account is found, update it
						doc.groups.push(groupObject._id);
						doc.save(function (err) {
							if(err){
								console.log('group not added to account: ' + err);
							}});

						console.log('rendering home');
						req.user.success = 'group created!';
						res.redirect('/home');
					}
				});
					
			}
		});
	}
	else{
		console.log('passwords dont match');
		res.render('createGroup', {errors: 'passwords do not match'});
	}

}

exports.groupQuery = function(req, res, next) {
	Group.find({username: req.groupName}, function(err, docs){
		if(err){
			res.json({message: err});
		}
		else{
			var jsonResponse = {groups : []};
			console.log(docs.length);
			var i;
			for(i = 0; i < docs.length; i++){
				jsonResponse['groups'].push(docs[i].name);
			}
			res.json(jsonResponse);
		}

	});
}




