//Initialize a REST client in a single line:
var client = require('twilio')('ACaa4a615b71711a1f1a3394874c727c65', '003bbe9573790342d76a9a8c7a6b1d97');
 
// Use this convenient shorthand to send an SMS:
/* client.sendSms({
    to:'+12404048112',
    from:'+12023350065',
    body:'ahoy hoy! Testing Twilio and node.js'
}, function(error, message) {
    if (!error) {
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
        console.log(error);
    }
}); */

var express = require('express'),
    twilio = require('twilio'),
    bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false })); 

// app.get('/', function(req, res) {
//     var twilio = require('twilio');
//     var twiml = new twilio.TwimlResponse();
//     if (req.query.Body == 'hello') {
//         twiml.message('Hi!');
//     } else if(req.query.Body == 'bye') {
//         twiml.message('Goodbye');
//     } else {
//         twiml.message('No Body param match, Twilio sends this in the request to your server.');
//     }
//     res.writeHead(200, {'Content-Type': 'text/xml'});
//     res.end(twiml.toString());
// });
var db = {}
/*
no state = name
1: 
*/
app.post('/', function(req, res) {
    var twiml = new twilio.TwimlResponse();
    var from = req.body.From;
    var responses = [];
    if (!db[from]) {
    	db[from] = 0;
    }

    if (req.body.Body == "s") {
    	db[from] = 9;
    }

    switch (db[from]) {
    	case 0:
    		twiml.message("Hello, I'm diagnoSMS, an application to help diagnose medical symptoms. What is the age of the patient?");
		    console.log(db);
		    db[from]++;
		    break;
    	case 1:
    		twiml.message("Is the patient (M)ale or (F)emale?");
		    console.log(db);
		    db[from]++;
		    break;
    	case 2:
    		twiml.message("Where did the patient's injury take place? (N)orth America, (E)urope, (A)frica, or (AS)ia.");
		    console.log(db);
		    db[from]++;
		    break;
    	case 3:
    		twiml.message("What's one symptom?");
		    console.log(db);
		    db[from]++;
		    break;
    	case 4:
    		twiml.message("What's another symptom?");
		    console.log(db);
		    db[from]++;
		    break;
    	case 5: 
    		twiml.message("What's another symptom?");
		    console.log(db);
		    db[from]++;
		    break;
    	case 6:
    		twiml.message("What's another symptom?");
    		res.send(twiml.toString());
		    console.log(db);
		    db[from]++;
	        break;
    }
    
    /* if (req.body.Body == 'hello') {
        twiml.message('Hi!');
    } else if(req.body.Body == 'bye') {
        twiml.message('Goodbye');
    } else {
        twiml.message('No Body param match, Twilio sends this in the request to your server.');
    } */
    if (req.body.Body == 'Limping') {
    	twiml.message("The patient likely has an Anterior Cruciate Ligament Injury or ACL injury. Another possibility is a ligament knee sprain.");
    }
    else if (req.body.Body == 'Fatigue') {
    	twiml.message("The patient likely has a concussion or a stroke.");
    }


    // responses.push(req.body.Body);
    console.log(responses);
    res.send(twiml.toString());
});

app.listen(3000, function () {
    console.log("Express server listening on port 3000");
});