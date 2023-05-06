const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan')

const showClientsRouter = require('./routes/showclients');
const addClientRouter = require('./routes/addclient');
const removeClientRouter = require('./routes/removeclient');
const indexRouter = require('./routes/index');
const addUserRouter = require('./routes/adduser');
const usersRouter = require('./routes/users');
const userAuthentication = require('./routes/userauthentication');
const changePasswordRouter = require('./routes/changepassword');
const UserForgotPasswordRouter = require('./routes/userforgotpassword');
const searchTableRouter = require('./routes/searchtable');
const cors = require('cors');

require('./models/connection_create');
require('./models/tables_creation');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
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
