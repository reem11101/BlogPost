var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
const Handlebars = require('handlebars');
const moment = require('moment');
const methodOverride = require('method-override')
const session = require('express-session');



const uri = 'mongodb+srv://mongo:mongo@cluster0.zcdoti8.mongodb.net/?retryWrites=true&w=majority';
//mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true});
mongoose
  .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


var indexRouter = require('./routes/index');    
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var postRouter = require('./routes/post');

// Register the formatDate helper
Handlebars.registerHelper('formatDate', function(date) {
  return moment(date).format('MMMM Do, YYYY');
});

var app = express();

app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});


// view engine setup for handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//authentication
app.use(session({
  secret: 'blog post',  // replace with a secret string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }  // set to 'auto' for secure cookies in HTTPS, regular cookies in HTTP
}));

app.use(session({/* session configuration options */}));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));


// using the routes created
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/post', postRouter);
// app.use('/newPost', newPostRouter)



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
