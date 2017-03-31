app.controller('SlideshowController', function ($scope, $timeout) {

	// 
	var newPunDelay = 3000;
	var oldPunDelay = 1000;


	// User-generated data
	$scope.oldPuns = [
		'Some pun that I have',
		'And another',
		'Yeah',
	]

	$scope.newPuns = [
		'NEW: And another',
		'NEW: Yeah',
	];


	$scope.currentPun = null

	rotatePuns()

	function rotatePuns() {
		// rotate oldPuns
		if ($scope.newPuns.length) {
			// show a new one
			$scope.currentPun = $scope.newPuns.shift();
			var delay = newPunDelay;
		} else {
			// show an old one
			$scope.currentPun = $scope.oldPuns.shift();	
			var delay = oldPunDelay;
		}
		
		$scope.oldPuns.push($scope.currentPun)

		$timeout(rotatePuns, delay)
	}

});