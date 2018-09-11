var express = require('express');
var router = express.Router();
 
	router.get('/:groupName' , function(req, res, next) {
		res.render('groupHome', {groupName: req.params.groupName} );
	});

module.exports = router;
