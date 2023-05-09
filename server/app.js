const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

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
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/api', indexRouter);
//app.use('/api/users', usersRouter);
app.get('/api/test', (req, res) => {
  res.status(200).send('test completed');
});
app.use('/api/adduser', addUserRouter);
app.use('/api/addclient', addClientRouter);
app.use('/api/removeclient', removeClientRouter);
app.use('/api/userauthentication', userAuthentication);
app.use('/api/showclients', showClientsRouter);
app.use('/api/changepassword', changePasswordRouter);
app.use('/api/userforgotpasssword', UserForgotPasswordRouter);
app.use('/api/searchtable', searchTableRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
