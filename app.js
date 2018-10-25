var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groupRouter = require('./routes/groups');
var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var morgan = require('morgan');
var db = require('./config/dbconnect');
var session = require('express-session');
var uuid = require('uuid/v4');
var FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var accountController = require('./controllers/accountController');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	cookie: {maxAge: 60*60*1000},
	genid: (req) => { 
		return uuid();
	},
	store: new FileStore(),
	saveUninitialized: true, 
	secret:"I really like frank ocean",

	}));

//intialize passport session
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser( function(user, done) {
	var sessionUser = {_id : user._id, username : user.username  };
	console.log('serilizing: ' + user.username);	

	done(null, sessionUser);
});

passport.deserializeUser( function(sessionUser, done) {
	console.log('deserializing: ' + sessionUser.username);
	var user = sessionUser;
	done(null, user);
});


//declare login method for passport
passport.use(accountController.passport_login);

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/groups' , groupRouter);
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
