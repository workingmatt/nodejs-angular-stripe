var express = require('express');
var app = express();
app.use(express.static(__dirname+'/public'));

app.get('/matt', function(req, res, next){
	try {
		res.send('Home<br/><a href="/matt">fangs</a>');
		// res.sendfile(__dirname+'/public/matt');
	} catch (e) {
		next(e)
	}
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Listening on localhost:3000');
});