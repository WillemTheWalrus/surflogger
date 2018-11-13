var express = require('express');
var router = express.Router();
var reportController = require('../controllers/reportController');


router.get('/newReport/:groupName', reportController.makeReportPage);
router.post('/newReport/:groupName', reportController.makeReport);
router.get('/:reportId', reportController.viewReport);

module.exports = router;

