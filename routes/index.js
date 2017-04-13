var express = require('express');
var router = express.Router();

var admin = require("firebase-admin");
var replies = require('../lib/replies.js');


// Firebase Config
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
	
	console.log('SMS received!')
	console.log(req.body)

	if (req.body.Body[0] == '.') {
		
		// this is a number-name update
		console.log('this is a number-name update')
		saveOrUpdateSender(req, function(err) {
			res.send({
				"received": true,
				err: err
			})
		})
		
	} else {
		// this is a pun
		console.log('this is a pun')
		savePun(req, function(err){
			res.send({
				"received": true,
				err: err
			})
		})
	}
	

});


router.get('/test', function(req, res, next) {
	
	replies.sendFirst(function(err, message){
		res.json(message)
	})
	
	
});


function savePun(req, cb) {
	var punData = {
		content: req.body.Body,
		from: req.body.From,
		seen: false,
		disabled: false
	}

	var punsRef = admin.database().ref("puns");

	
	// check if this is the first pun from this person
	punsRef.orderByChild('from')
		.equalTo(punData.from)
		.once('value')
		.then(function(snapshot){

			var pun = snapshot.val()

			console.log(pun)


			// function writePun(punData) {
			// 	punsRef.push().set(punData, cb)
			// }

			if (!pun) {
				// this was their first
				replies.sendFirst(punData.from, function(){
					punsRef.push().set(punData, cb)
				})
			} else if(Object.keys(pun).length < 4) {
				// this was their 2nd-4th
				replies.sendInsult(punData.from, function(){
					punsRef.push().set(punData, cb)
				})
			} else {
				// no more replies
				punsRef.push().set(punData, cb)
			}
		})
	
}

function saveOrUpdateSender(req, cb) {

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
				
				sendersRef.update(sender, cb)

			} else {
				// new sender
				console.log('new sender');
				sendersRef.push().set({
					'telephone': telephone,
					'name': name
				}, function(err){
					console.log(err)
					cb(err)
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
