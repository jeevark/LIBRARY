var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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

var mongoDB =require('./mongoDB')

const admin =require('./Module/admin')
const student =require('./Module/student')
const { authenticateToken } =require('./Token/authentication')

//calling function....................


//app.post('/signin',admin.signin);
app.post('/signup',admin.signup);
app.post('/student_signup',student.signup);
app.post('/student_login',student.login);
app.get('/posts',authenticateToken,student.auth);
app.post('/addbook',admin.addBook);

app.get('/lendBook/id/?',authenticateToken,student.lendBook);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
