var express = require('express');
var router = express.Router();
var reportController = require('../controllers/reportController');


router.get('/:groupName', reportController.makeReportPage);
router.post('/:groupName', reportController.makeReport);

module.exports = router;

