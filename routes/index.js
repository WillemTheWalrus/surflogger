var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var accountController = require('../controllers/accountController');
var groupController = require('../controllers/groupController');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SurfLogger' });
});



//handle login
router.post('/', 
	passport.authenticate('local', { successRedirect: '/home',
					 failureRedirect: '/',
					 failureFlash: true })
);
router.get('/home', accountController.render_home);
//handle account creation
router.get('/createAccount', accountController.account_create_page);
router.post('/createAccount', accountController.account_create);

router.get('/createGroup', groupController.group_create_page);
router.post('/createGroup', groupController.group_create);



module.exports = router;
