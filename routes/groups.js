var express = require('express');
var router = express.Router();
var groupController = require('../controllers/groupController');

	router.get('/:groupName' , function(req, res, next) {
		res.render('groupHome', {groupName: req.params.groupName} );
	});
	
	router.post('/groupQuery', groupController.groupQuery);
module.exports = router;
