
// Twilio Config
var accountSid = 'AC427e52e5d91ac7ee98f4367bd17ff2fc'; // Your Account SID from www.twilio.com/console
var authToken = '0cc51fdef43deafc5a48b2f3a1dcdae7';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);



var replies = {

	sendFirst: function(to, cb) {

		var msg = "To set your name, reply to this number starting with a full stop. example: .Jedward"
		client.messages.create({
		    body: msg,
		    to: to,  // Text this number
		    from: '+447492881533' // From a valid Twilio number
		}, function(err, message) {
		    
		    cb(err, message)
		});

	},
	sendInsult: function(to, cb) {

		var msgs = [
			"That's rubbish. Try harder",
			"You can do better than that",
			"Hear that? That's the sound of tumbleweed...",
			"Pundamentally terrible",
			"Facepalm",
			"Awful",
			"Meh",
		]

		var msg = msgs[Math.floor(Math.random() * msgs.length)];

		client.messages.create({
		    body: msg,
		    to: to,  // Text this number
		    from: '+447492881533' // From a valid Twilio number
		}, function(err, message) {
		    
		    cb(err, message)
		});

	}
}



module.exports = replies