var app = angular.module('myApp', []);

var publicStripeApiKeyTesting = 'pk_test_58Aqhu83LClAFZZohgWbbBx6';

app.controller('formCtrl', ['$scope', '$http', function($scope, $http){
	$scope.cardNumber = 'card no';
	$scope.cardCvc = "cvcX";
	$scope.cardExpiryMonth = "month";
	$scope.cardExpiryYear = "year";

	$scope.pay = function(){
		var res = $http.post('/pay', $scope.formData);
		$http.post('/pay', $scope.formData).
			success(function(data){
				console.log('post successful');
			}).error(function(data){
				console.log('error in posting');
			});
		console.log("res.success: ");
	};

}]);

app.controller('TestingCtrl', function($scope){
	$scope.message = 'Angular is pretty cool.';
	$scope.payOutput = 'Setting up TestingCtrl';
	$scope.newTodo = '';
	$scope.todos = [
		'Learn Sketch',
		'Look at thing and feel',
		'Learn stuff'
		];

	$scope.pay = function() {
		$scope.payOutput = 'Woohoo';
		stripeHandler.open({
			name: 'Stripe.com',
			description: '2 widgets',
			zipCode: true,
			amount: 1234
		});
		$scope.payOutput = 'Jan';
	};

	$scope.done = function(todo) {
		var indexOf = $scope.todos.indexOf(todo);
		if (indexOf !== -1) {
			$scope.todos.splice(indexOf, 1);
		}
	};

	$scope.add = function(ev) {
		if (ev.which && ev.which ===13){
			$scope.todos.push($scope.newTodo);
			$scope.newTodo = '';
		}
	};

});
