var Group = require('../models/group');
var session = require('express-session');

exports.group_create_page = function(req, res, next) {
	res.render('createGroup');
}

exports.group_create = function(req, res, next) {
	var groupName = req.body.groupName;
	var Description = req.body.description;
	var password = req.body.groupPassword;
	var passwordValidate = req.body.groupValidatePassword;
	
	if(password == passwordValidate){
		console.log(req.session.userID);
		var groupObject = new Group({name: groupName, description: Description, password: passwordValidate, admin:req.session.userID});
		groupObject.save(function(err) {
			if(err){
				console.log('save error');
				res.render('createGroup', {errors: err});
			}
			else {
				console.log('rendering home');
				res.render('home', {success: 'Group created successfully'});
			}
		});
	}
	else{
		console.log('passwords dont match');
		res.render('createGroup', {errors: 'passwords do not match'});
	}

}


