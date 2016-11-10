var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/matt', function(req, res, next){
	try {
		res.send('Home<br/><a href="/matt">fangs</a>');
		// res.sendfile(__dirname+'/public/matt');
	} catch (e) {
		next(e)
	}
});

app.post('/pay', function(req,res){
	console.log("post ");
	console.log(req.body);
	res.end();
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Listening on localhost:3000');
});