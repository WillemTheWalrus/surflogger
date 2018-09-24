var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var accountController = require('../controllers/accountController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SurfLogger' });
});



//handle login
router.post('/home',accountController.login_auth);

//handle account creation
router.get('/createAccount', accountController.account_create_page);
router.post('/createAccount', accountController.account_create);


module.exports = router;
