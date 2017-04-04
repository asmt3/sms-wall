app.controller('AdminController', function ($scope, $timeout, $firebaseArray, $firebaseObject) {

	var ref = firebase.database().ref().child("puns");
	$scope.puns = $firebaseArray(ref);

	$scope.updatePun = function(pun) {
	
		ref.child(pun.$id).update({
			disabled: pun.disabled
		})
	}

	$scope.deletePun = function(pun) {
		$scope.puns.$remove(pun);
	}

});