var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var accountController = require('../controllers/accountController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SurfLogger' });
});


router.get('/createAccount', function(req, res, next) {
	res.render('createAccount');
});

router.get('/home', function(req, res, next) {
	res.render('home');
});

router.post('/home',accountController.login_auth);

router.post('/createAccount', accountController.account_create);

	//in the future redirect back to home if the login info is incorrect

module.exports = router;
