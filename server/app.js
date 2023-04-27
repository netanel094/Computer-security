var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var showClientsRouter = require('./routes/showclients');
var addClientRouter = require('./routes/addclient');
var removeClientRouter = require('./routes/removeclient');
var indexRouter = require('./routes/index');
var addUserRouter = require('./routes/adduser');
var usersRouter = require('./routes/users');
var userAuthentication = require('./routes/userauthentication');
var changePasswordRouter = require('./routes/changepassword');
var UserForgotPasswordRouter = require('./routes//userforgotpassword');
var searchTableRouter = require('./routes/searchtable');

require('./models/connection_create');
require('./models/tables_creation');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/adduser', addUserRouter);
app.use('/addclient', addClientRouter);
app.use('/removeclient', removeClientRouter);
app.use('/userauthentication', userAuthentication);
app.use('/showclients', showClientsRouter);
app.use('/changepassword', changePasswordRouter);
app.use('/userforgotpasssword', UserForgotPasswordRouter);
app.use('/searchtable', searchTableRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
