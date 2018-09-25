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

	var groupObject = new Group({name: groupName, description: Description, password: passwordValidate});
	groupObject.save(function(err) {
		if(err){
			res.render('createGroup', {errors: err});
		}
		else {
			res.render('home', {success: 'Group created successfully'});
		}
	});
}


