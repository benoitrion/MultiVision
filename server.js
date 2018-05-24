var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
  return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser());
app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
));

app.use(express.static(__dirname + '/public'));

//mongoose.connect('mongodb://localhost/multivision');
//mongoose.connect('mongodb://root:password@127.0.0.1:27017/multivision');
console.log(env);
if (env === 'development') {
  mongoose.connect('mongodb://127.0.0.1:27017/multivision');
} else {
  mongoose.connect('mongodb://benoitrion:multivision@ds133630.mlab.com:33630/multivision');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('multivision db opened');
});

app.get('/partials/:partialPath', function(req, res) {
  console.log('in controller partials/' + req.params.partialPath)
  res.render('partials/' + req.params.partialPath);
})

app.get('*', function(req, res) {
    res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening port on port ' + port + '...');