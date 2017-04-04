app.controller('SlideshowController', function ($scope, $timeout, $firebase, $firebaseArray) {

	// 
	var newPunDelay = 3000;
	var oldPunDelay = 1000;

	$scope.currentPun = null
	$scope.newCount = 0;

	var ref = firebase.database().ref().child("puns");
	$scope.puns = $firebaseArray(ref);

	// start once loaded
	$scope.puns.$loaded(function(){
		rotatePuns()
	})

	var rotatePuns = function(){
		$scope.currentPun = pickPun();

		if ($scope.currentPun) { // don't do anything until loaded
			var delay = $scope.currentPun.seen ? oldPunDelay : newPunDelay;

			// update seen time
			var now = new Date().getTime()/1000
			ref.child($scope.currentPun.$id).update({
				seen: now
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

	


});