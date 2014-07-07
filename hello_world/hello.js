var express = require('express');
var app = express();
var port = 3000;

app.get('*', function (req, res) {
  res.end('Hello world!');
});

app.listen(port, function () {
  console.log('The server is running, ' + 'please open your browser at http://localhost:%s', port);
});
