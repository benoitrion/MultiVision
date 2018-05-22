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
mongoose.connect('mongodb://127.0.0.1:27017/multivision');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('multivision db opened');
});
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
  mongoMessage = messageDoc.message;
});


app.get('/partials/:partialPath', function(req, res) {
  console.log('in controller partials/' + req.params.partialPath)
  res.render('partials/' + req.params.partialPath);
})

app.get('*', function(req, res) {
    res.render('index', {
      mongoMessage: mongoMessage
    });
});

var port = 3030;
app.listen(port);
console.log('Listening port on port ' + port + '...');