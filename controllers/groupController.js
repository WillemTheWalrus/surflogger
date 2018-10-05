var Group = require('../models/group');
var session = require('express-session');

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
		console.log(req.session.userID);
		var groupObject = new Group({name: groupName, description: Description, password: passwordValidate, admin: req.user._id});
		groupObject.save(function(err) {
			if(err){
				console.log('save error');
				res.render('createGroup', {errors: err});
			}
			else {
				console.log('rendering home');
				req.user.success = 'group created!';
				res.redirect('/home');
			}
		});
	}
	else{
		console.log('passwords dont match');
		res.render('createGroup', {errors: 'passwords do not match'});
	}

}


