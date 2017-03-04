var express = require('express');
var app = express();

var port = process.env.PORT || 4111;

app.listen(port, function() {
  console.log('Background-Job-Search now running on port', port);
});