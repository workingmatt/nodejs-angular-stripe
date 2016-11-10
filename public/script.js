var app = angular.module('myApp', []);

var publicStripeApiKeyTesting = 'pk_test_58Aqhu83LClAFZZohgWbbBx6';

Stripe.setPublishableKey(publicStripeApiKeyTesting);

app.controller('formCtrl', function($scope, $http){

	$scope.pay = function(){

		$scope.formData.amount = 123456;
		Stripe.createToken({
			number: $scope.formData.cardNumber,
			cvc: $scope.formData.cardCvc,
			exp_month: $scope.formData.cardExpiryMonth,
			exp_year: $scope.formData.cardExpiryYear
		}, $scope.formData.amount, function(status, response){
				if(response.error){
					console.log('Create token error');
					console.log(response.error.message);
					return;
				}
				$scope.formData.token = response.id;

				$http.post('/pay', $scope.formData).
				success(function(data){
					console.log('post successful');
				}).error(function(data){
					console.log('error in posting');
				});
				console.log("res.success: ");
			});
	};

});

app.controller('TestingCtrl', function($scope){
	$scope.message = 'Angular is pretty cool.';
	$scope.payOutput = 'Setting up TestingCtrl';
	$scope.newTodo = '';
	$scope.todos = [
		'Learn Sketch',
		'Look at thing and feel',
		'Learn stuff'
		];

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
