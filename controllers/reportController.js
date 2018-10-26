var Report = require('../models/report');

exports.get_report = function(req, res, next) {
	res.send('here we will search our dbs for the specified report');
}

exports.makeReportPage = function(req, res){
	res.render('newReport', {groupName: req.params.groupName});
}

exports.makeReport = function(req, res) {
	var time = req.body.timein;
	var rating = req.body.rating;
	console.log('report time: ' + time);
	console.log('report rating: ' + rating);
	res.send('report made');
}
	
