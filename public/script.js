var app = angular.module('Testing', []);

var publicStripeApiKeyTesting = 'pk_test_58Aqhu83LClAFZZohgWbbBx6';

var stripeHandler = StripeCheckout.configure({
	key: 'pk_test_58Aqhu83LClAFZZohgWbbBx6',
	image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
	locale: 'auto',
	token: function(token){
		//token.id		console.log("Config stripeHandler: "+token.id);
		stripePay.create({
			amount: 1234,
			currency: 'gbp',
			source: token,
			description: "Matt's Test Charge"},
			function(err, charge){
				if(err&&err.type == 'StripeCardError') {
					console.log('card declined');
				}
			}
		);
	}
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
