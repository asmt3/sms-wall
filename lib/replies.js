
// Twilio Config
var accountSid = process.env.TWILIO_ACCOUNT_ID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

// Get Config
const config = require("../config/replies");


var replies = {

	sendFirst: function(to, cb) {

		var msg = "To set your name, reply to this number starting with a full stop. example: .Jedward"
		client.messages.create({
		    body: msg,
		    to: to,  // Text this number
		    from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
		}, function(err, message) {
		    console.log(err, message);
		    cb(err, message)
		});

	},
	sendInsult: function(to, cb) {

		var msgs = config.insults

		var msg = msgs[Math.floor(Math.random() * msgs.length)];

		client.messages.create({
		    body: msg,
		    to: to,  // Text this number
		    from: process.env.TWILIO_PHONE_NUMBER // From a valid Twilio number
		}, function(err, message) {
		    
		    cb(err, message)
		});

	}
}



module.exports = replies