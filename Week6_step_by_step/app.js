var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://pjh:pjh@ds137110.mlab.com:37110/coding101');

var app = express();

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
})

app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});
