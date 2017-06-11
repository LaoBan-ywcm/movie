var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var dbUrl = 'mongodb://localhost/moviesite';
//后台看到具体的资源访问情况
var morgan = require('morgan');

mongoose.connect(dbUrl);

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//session的实现需要用到cookie
app.use(cookieParser());
//利用mongodb来实现session
app.use(session({
    secret:'movie',
    store:new mongoStore({
        url:dbUrl,
        collection:'sessions'
    }),
    resave:false,
    saveUninitialized:true
}));

if(app.get('env') === 'development'){
    app.set('showStackError',true);
    app.use(morgan(':method :url :status'));
    app.locals.pretty = true;//网页源代码不压缩
    mongoose.set('debug',true);
}



app.use(express.static(path.join(__dirname, 'public')));

app.locals.moment = require('moment');


app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



app.listen(3000);

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
