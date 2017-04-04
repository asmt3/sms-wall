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

router.post('/receive', function(req, res, next) {

	var punData = {
		content: req.body.Body,
		from: req.body.From,
		seen: false,
		disabled: false
	}

	var punsRef = admin.database().ref("puns");
	punsRef.push().set(punData).then(snapshot => {
		res.send(punData);
	})
	res.send({"received": true})

});


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
