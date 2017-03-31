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
  res.render('index', { title: 'Express' });
});


router.get('/sms', function(req, res, next){

	var punData = {
		content: 'text tesxt'
	}

	var punsRef = admin.database().ref("puns");
	punsRef.push().set(punData).then(snapshot => {
		res.send(punData);
	})

})

module.exports = router;
