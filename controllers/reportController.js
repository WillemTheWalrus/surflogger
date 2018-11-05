var Report = require('../models/report');
const {PythonShell} = require('python-shell');



exports.get_report = function(req, res, next) {
	res.send('here we will search our dbs for the specified report');
}

exports.makeReportPage = function(req, res){
	res.render('newReport', {groupName: req.params.groupName});
}

exports.makeReport = function(req, res) {
	
    var userTime = req.body.timein;
    console.log(userTime);
	var options = {
			
		scriptPath: '/home/admin/surflogger/python/',
		args: [userTime]
	};

	var pyshell = new PythonShell('46244FileReader.py', options);
	pyshell.on('message', function(message) {
		
		
		console.log(message.split(" "));

	});

	pyshell.end(function(err) {
		if(err){
			console.log(err);
		}
		else{
			console.log('done');
		}
	});

	res.send('done');
		
		
	var time = req.body.timein;
	var rating = req.body.rating;
	console.log('report time: ' + time);
	console.log('report rating: ' + rating);

}
	
