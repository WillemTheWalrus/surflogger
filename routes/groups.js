var express = require('express');
var router = express.Router();
var groupController = require('../controllers/groupController');

//renders the group home page
router.get('/groupPage/:groupName' , groupController.groupHomePage);
	
/*
 * Save this in case I decide to do dynamic group queries
router.post('/groupQuery', groupController.groupQuery);
**/

//Sends the users to the search result page upon submitting a search in the group search bar
router.post('/groupSearch', groupController.groupSearch);

router.post('/auth/:groupName', groupController.groupLogin);

router.get('/auth/:groupName', groupController.groupLoginPage);

module.exports = router;

