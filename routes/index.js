var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SurfLogger' });
});


router.get('/home', function(req, res, next) {
	res.render('home');
});

router.post('/home', function(req, res, next) {
	res.render('hello world!');
});

module.exports = router;
