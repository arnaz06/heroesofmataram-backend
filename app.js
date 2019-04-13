var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
var crypto = require('crypto')


var index = require('./routes/index')
var users = require('./routes/users')
var databaseConfig = require('./config/database')
var cors = require('cors')

require('dotenv').config()
var mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(databaseConfig.dbUrl, {
  useMongoClient: true
});

var app = express();
var router = express.Router()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use cors
app.use(cors())

app.set('superSecret', process.env.SECRET_KEY)
app.set('algorithm', process.env.ALGORITHM)
app.set('password', process.env.PASSWORD)

//verif token
router.use(function(req, res, next) {

  var head = req.headers.authorization ? req.headers.authorization.split(' ') : ''
  var token = null

  if (head.length == 2) {
    var scheme = head[0]
    if (/^Bearer$/i.test(scheme)) {
      token = head[1]

      function decrypt(text) {
        var decipher = crypto.createDecipher(app.get('algorithm'), app.get('password'))
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec
      }
      if (decrypt(token) == app.get('superSecret')) {
        next()
      } else {
        res.json({
          success: false,
          message: 'Failed to authenticate token.'
        })
      }
    }
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
})

app.use('/v1', router);
app.use('/ping', index);
app.use('/v1/user', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
