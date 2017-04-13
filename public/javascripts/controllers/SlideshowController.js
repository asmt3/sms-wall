app.controller('SlideshowController', function ($scope, $timeout, $interval, $firebase, $firebaseArray) {

	// 
	var newPunDelay = 5000;
	var oldPunDelay = 2000;

	$scope.numbersToText = [
		'07492 881 533',
		'07492 881 JED'
	];
	$scope.currentPun = null
	$scope.currentSenderId = null;
	$scope.newCount = 0;

	var punsRef = firebase.database().ref().child("puns");
	$scope.puns = $firebaseArray(punsRef);

	var sendersRef = firebase.database().ref().child("senders");
	$scope.senders = $firebaseArray(sendersRef);

	// start once loaded
	$scope.puns.$loaded(function(){
		rotatePuns()
	})

	var rotatePuns = function(){
		console.log('rotatePuns');

		$scope.currentPun = pickPun();
		$scope.currentSenderId = getSenderId($scope.currentPun)


		var delay = oldPunDelay;

		if ($scope.currentPun) { // don't do anything until loaded
			var delay = $scope.currentPun.seen ? oldPunDelay : newPunDelay;

			// update seen time
			var now = new Date().getTime()/1000
			punsRef.child($scope.currentPun.$id).update({
				seen: now
			}, function(err){
				if (err) console.log(err)
			})

		}

		$timeout(rotatePuns, delay);
		
	}

	var pickPun = function() {

		var newCount = 0;

		var filteredPuns = $scope.puns.filter(function(pun){

			// while we're looping, count new
			if ( !pun.seen ) newCount++

			return ( !pun.disabled );
			
		})

		$scope.newCount = newCount - 1; // as this one is about to be seen


		var sortedPuns = filteredPuns.sort(function(a, b) {
			if (a.seen == false) return -1;
			else if (b.seen == false) return 1;
			else return (a.seen < b.seen) ? -1 : 1
		});

		return sortedPuns.length ? sortedPuns[0] : false;
	}

	var getSenderId = function(pun) {
		var senderDetail = $scope.senders.find((sender) => {
			if (sender.telephone == pun.from) return true
		})

		if (senderDetail && senderDetail.name) {
			return senderDetail.name
		} else {
			return pun.from
		}
	}

	var rotateNumbersToText = function() {
		$scope.numbersToText.push($scope.numbersToText.shift())
	}

	$interval(rotateNumbersToText, 5000);
	


});