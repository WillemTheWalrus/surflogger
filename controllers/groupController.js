var Group = require('../models/group');
var Account = require('../models/account');
var Report = require('../models/report');
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
		var groupObject = new Group({name: groupName, description: Description, password: passwordValidate, admin: req.user._id,}); 
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

/*
 *
 * This is my dynamic query function, it originally was queried everytime a user pressed a key down but
 * that could be very server intensive. 
 * I have decided to revisit the dynamic group query once other more important parts of the site have
 * been built out first
exports.groupQuery = function(req, res, next) {
	console.log("search query: " + req.body.groupName);
	Group.find({name: {$regex: ".*"+ req.body.groupName + ".*"}}, function(err, docs){

		if(err){
			res.json({message: err});
		}
		else{
			if(docs.length > 0){
				var jsonResponse = {groups : []};
				console.log(docs[0].name);
				var i;
				for(i = 0; i < docs.length; i++){
					jsonResponse['groups'].push(docs[i].name);
				}
				res.json(jsonResponse);
			}
		}

	});
}
**/

/*
 * Renders the group results page after querying the db for groups
 * matching the name that was submitted from the group search bar
 */
exports.groupSearch = function(req, res, next) {
	var userGroupSearch = req.body.groupInput;

	Group.find({name: {$regex: ".*"+ userGroupSearch + ".*"}}, function(err, docs){

		if(err){
			res.send('error: ' + err);
		}
		else{
			res.render('searchGroupResults', {results: docs});
		}

	});
}
/**
 * If the user is a member of the group, render the home page,
 * otherwise, redirect them to the group login page
 */
exports.groupHomePage = function(req, res, next) {
	Account.findOne({ _id: req.user._id} ).populate('groups','name').exec(function(err, result){
		var isMember = false;
		var i
		for( i = 0; i < result.groups.length; i++)
		{
			if(result.groups[i].name === req.params.groupName){
                isMember = true;
                console.log(result.groups[i]._id);
                //find all the reports that were made to the group and send them to the template
                Report.find({belongsTo: new ObjectId(result.groups[i]._id)}, function(err, reports){
                    if(err){
                        console.log(err);
                    }
                    else if(reports == null){
                        return res.render('groupHome', {groupName : req.params.groupName, groupReports: null});
                    }
                    else{
                        console.log(reports);
                        res.render('groupHome', {groupName : req.params.groupName, groupReports: reports});

                    }
                });

				
			}
		}

		if(!isMember){
			res.redirect('/groups/auth/'+ req.params.groupName);
		}
	});
}

exports.groupLoginPage = function(req,res,next) {
	res.render('groupPassword', {groupName: req.params.groupName});
}

exports.groupLogin = function(req,res,next) {

	var groupName = req.params.groupName;
	var groupPass = req.body.password;

	Group.findOne({ name: groupName} , function(err, currentGroup){

		if(err){
			res.send(err);
		}
		else{
			if(currentGroup.password == groupPass){
				//add the group to the user's list of groups
				Account.findOne({_id: req.user._id}, function(err, userAccount){
					userAccount.groups.push(currentGroup);
					userAccount.save(function(err){
						if(err){
							console.log(err);
						}
					});
				});

				//redirect the user to the group home page
				res.redirect('/groups/groupPage/'+groupName);
			}
			else{
				res.send('incorrect password');
			}
		}
	});
}




