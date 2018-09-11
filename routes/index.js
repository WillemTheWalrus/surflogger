var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

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

router.post('/home', function(req, res, next) {
	//in the future redirect back to home if the login info is incorrect
	res.render('home');
});

module.exports = router;
