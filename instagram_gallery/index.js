var express = require('express');
var superagent = require('superagent');
var exphbs = require('express3-handlebars');

var app = express();

var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    math: function (lvalue, operator, rvalue, options) {
      lvalue = parseFloat(lvalue);
      rvalue = parseFloat(rvalue);

      return {
        '+': lvalue + rvalue,
        '-': lvalue - rvalue,
        '*': lvalue * rvalue,
        '/': lvalue / rvalue,
        '%': lvalue % rvalue
      }[operator];
    }
  }, extname: '.hbs'
});

// Config template engine.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Static folder.
app.use(express.static(__dirname + '/public'));

var user = 'azat_co';
var storySlug = 'kazan';

app.get('/', function (req, res) {
  superagent.get('http://api.storify.com/v1/stories/' + user + '/' + storySlug)
    .query()
    .set({
      Accept: 'application/json'
    })
    .end(function (e, storifyResponse) {
      if(e) return next(e);
      return res.render('index', storifyResponse.body.content);
    });
});

app.listen(3001);
