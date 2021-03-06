const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override')
const dotenv = require('dotenv').config()

const mapRouter = require('./routes/map');
const usersRouter = require('./routes/users');
const dogeventRouter = require('./routes/dogevent');
const profileRouter = require('./routes/profile');
const sessionsRouter = require('./routes/sessions');

const app = express();


const expressLayouts = require('express-ejs-layouts');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts) //layout
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.use(session({ key: 'user_sid',
secret: 'super_secret',
resave: false,
saveUninitialized: false,
cookie: {
  expires: 600000 }
}));

// clear the cookies after user logs out
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect('/sessions/new');
  } else {
    next();
  }
};

// route setup
app.use('/', usersRouter);
app.use('/map', sessionChecker, mapRouter);
app.use('/users', usersRouter);
app.use('/dogevent',sessionChecker, dogeventRouter);
app.use('/profile', profileRouter);
// app.use('/uploadphoto', uploadPhotoRouter);
app.use('/sessions', sessionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
