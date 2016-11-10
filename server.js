var express = require('express');
var bodyParser = require('body-parser');

var config = require('./config.json');
var stripe = require('stripe')(config.stripe[0].secretKeyTest);
console.log("sk: "+config.stripe[0].secretKeyTest);

var app = express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/pay', function(req,res){
	console.log(req.body);
	var token = req.body.token;
	var charge = stripe.charges.create({
		amount: req.body.amount,
		currency: "gbp",
		source: token,
		description: "Test Charge"
	}, function(err, charge){
		if (err){console.log(err);}
		if (charge){console.log(charge.id);}
	});

	res.end();
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Listening on localhost:3000');
});