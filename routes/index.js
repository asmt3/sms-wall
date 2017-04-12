var express = require('express');
var router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smswall-7e973.firebaseio.com"
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JedWed Band Names' });
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'JedWed Band Names' });
});

router.post('/receive', function(req, res, next) {
	
	if (req.body.Body[0] == '.') {
		
		// this is a number-name update
		console.log('this is a number-name update')
		saveOrUpdateSender(req)
		// .then(snapshot => {
		// 	res.send(punData);
		// 	res.send({"received": true})
		// });
	} else {
		// this is a pun
		console.log('this is a pun')
		savePun(req).then(snapshot => {
			res.send(punData);
			res.send({"received": true})
		});
	}
	

});


router.get('/test', function(req, res, next) {
	
	
	
});


function savePun(req) {
	var punData = {
		content: req.body.Body,
		from: req.body.From,
		seen: false,
		disabled: false
	}

	var punsRef = admin.database().ref("puns");
	return punsRef.push().set(punData)
}

function saveOrUpdateSender(req) {

	var name = req.body.Body.substr(1);
	var telephone = req.body.From;

	var sendersRef = admin.database().ref("senders");


	sendersRef.orderByChild('telephone')
		.equalTo(telephone)
		.once('value')
		.then(function(snapshot){

			var sender = snapshot.val()

			console.log(sender)

			if (sender) {
				// update sender
				console.log('update sender');

				for(k in sender) {
			        sender[k].name = name
			    }
				
				sendersRef.update(sender)

			} else {
				// new sender
				console.log('new sender');
				var newSenderRef = sendersRef.push();
				newSenderRef.set({
					'telephone': telephone,
					'name': name
				});
			}

		})
	
	
}


router.get('/sms', function(req, res, next){

	var punData = {
		content: req.query.content ? req.query.content : 'text text ' + Math.random(),
		from: 'xxx',
		seen: false,
		disabled: false
	}

	var punsRef = admin.database().ref("puns");
	punsRef.push().set(punData).then(snapshot => {
		res.send(punData);
	})

})

router.get('/multi', function(req, res, next){

	

	var punsRef = admin.database().ref("puns");

	for (var i = 0; i < 10; i++) {


		var punData = {
			content: "Multi " + i,
			from: 'xxx',
			seen: false,
			disabled: false
		}

		punsRef.push().set(punData).then(snapshot => {
			res.send(punData);
		})
	}

	

})

module.exports = router;
