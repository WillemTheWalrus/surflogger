var Report = require('../models/report');
var Group = require('../models/group');
const {PythonShell} = require('python-shell');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;


exports.get_report = function(req, res, next) {
	res.send('here we will search our dbs for the specified report');
}

exports.makeReportPage = function(req, res){
	res.render('newReport', {groupName: req.params.groupName});
}

exports.makeReport = function(req, res) {

    
    
    var userTime = req.body.timein;
    /**
     * When the data is returned, it will be stored in buoyData in the following way
     * (time is stored in the GWT zone and the measurements are in meters)
     * buoyData[0] = Year
     * buoyData[1] = Month
     * buoyData[2] = Day 
     * buoyData[3] = Hour
     * buoyData[4] = Minute
     * buoyData[5] = Wave Height
     * buoyData[6] = Swell Height
     * buoyData[7] = Swell Period
     * buoyData[8] = Wind Wave Height
     * buoyData[9] = Wind Wave Period
     * buoyData[10] = Swell Direction
     * buoyData[11] = Wind Wave Direction
     * buoyData[12] = Steepness
     * buoyData[13] = Average Period
     * buoyData[14] = Mean Wave Direction
     */
    var buoyData;    
    console.log(userTime);
	var options = {
			
		scriptPath: '/home/admin/surflogger/python/',
		args: [userTime]
	};

	var pyshell = new PythonShell('46244FileReader.py', options);
	pyshell.on('message', function(message) {
		
		
        buoyData = message.split(" ");

	var i = 0;
	for( i =0; i < buoyData.length; i++){
        buoyData[i] = buoyData[i].replace(/[^0-9a-zA-Z.]/gi, '');
       
	}

        console.log(buoyData);
	    console.log(buoyData[0]);
        var submissionDate = new Date();
        
    
        //create a Date object for when the buoy data was recorded
        var reportDate = new Date();
        reportDate.setFullYear(parseInt(buoyData[0]));
        reportDate.setMonth(parseInt(buoyData[1]));
        reportDate.setDate(parseInt(buoyData[2]));
        reportDate.setHours(parseInt(buoyData[3]));
        reportDate.setMinutes(parseInt(buoyData[4]));
        
        //convert from GWT zone to PST (Will still say it is in GWT though)
        reportDate.setHours(reportDate.getHours()-8);
        console.log(reportDate);
        
        //convert the height and period data from meters to feet (parse periods to floats)
        var waveHeight = parseFloat(buoyData[5]);
        waveHeight = Math.round((waveHeight*3.28084)*100)/100;
    
        console.log(waveHeight);
        var swellHeight = parseFloat(buoyData[6]);
        swellHeight = Math.round((swellHeight*3.28084)*100)/100;
    
        var windWaveHeight = parseFloat(buoyData[8]);
        windWaveHeight = Math.round((windWaveHeight*3.28084)*100)/100;

        var swellPeriod = parseFloat(buoyData[7]);
        
        var windWavePeriod = parseFloat(buoyData[9]);

        var groupId;
        //find the groupID of the group that will own this report
        Group.findOne({name: req.params.groupName}, function(err, group){
            if(err){
                console.log(err);
            }
            else{
                groupId = group._id;
                console.log('groupid: '+groupId);

                Report.create({
             
                    submittedBy: req.user._id, 
                    belongsTo: groupId, 
                    submittedOn: submissionDate,
                    buoyReportDate: reportDate,
                    WVHT: waveHeight,
                    SwH: swellHeight,
                    SwP: swellPeriod,
                    SwD: buoyData[10],
                    WWH: windWaveHeight,
                    WWP: windWavePeriod,
                    WWD: buoyData[11],
                    STEEPNESS: buoyData[12],
                    APD: parseFloat(buoyData[13]),
                    MWD: parseInt(buoyData[14]),
                    location: req.body.location,
                    rating: req.body.rating
        
                }, 
                function(err, report){
                    if(err){
                        console.log(err);
                    }
                else{
                console.log(report);
                }
                });
                
            
                var redirectURL = '/groups/groupPage/'+ req.params.groupName;
                res.redirect(redirectURL);
            }
        });
    
        //save report data in a new report object
         

    });
    
    
	pyshell.end(function(err) {
		if(err){
			console.log(err);
		}
		else{
			console.log('done');
		}
	});
}

exports.viewReport = function(req, res) {
	
	reportId = req.params.reportId;
	
	Report.findById(ObjectId(reportId), function(err, foundReport){
		if(err){
			console.log(err);
			res.redirect('/');
		}
		else{
			res.render('viewReport', { report: foundReport});
		}
	});
}

