var express = require('express');
var url = require('url');

var app = express();
app.use(express.logger());

app.all('*', function(request, response) {
  var encodedData = url.parse(request.originalUrl).query;
  var data = decodeURI(encodedData);;
  response.send(data);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});

