const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const pages = require('./pages');

const addClientRouter = require('./routes/addclient');
const removeClientRouter = require('./routes/removeclient');
const addUserRouter = require('./routes/adduser');
const userAuthentication = require('./routes/userauthentication');
const changePasswordRouter = require('./routes/changepassword');
const UserForgotPasswordRouter = require('./routes/userforgotpassword');
const searchTableRouter = require('./routes/searchtable');
const cors = require('cors');

require('./models/connection_create');
require('./models/tables_creation');

var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/test', (req, res) => {
  res.status(200).send('test completed');
});
app.use('/api/adduser', addUserRouter);
app.use('/api/addclient', addClientRouter);
app.use('/api/removeclient', removeClientRouter);
app.use('/api/userauthentication', userAuthentication);
app.use('/api/changepassword', changePasswordRouter);
app.use('/api/userforgotpasssword', UserForgotPasswordRouter);
app.use('/api/searchtable', searchTableRouter);
app.use(pages);

module.exports = app;
