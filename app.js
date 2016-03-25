var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var chat=require('./routes/chat');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var dbinfo = require('./app/utils/db');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'jade');
app.locals.pretty = true;//jade输出的页面不压缩

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var connection = mongoose.createConnection(dbinfo.getUrl());


/**
 * 使用sesssion
 * @type {String}
 */
app.use(session({
    secret: 'books-session',
    store: new MongoStore({ mongooseConnection: connection}),
    cookie: { maxAge:  new Date(Date.now() + 1000*60*60*24*14)},//14天
}));


app.use('/', routes);
app.use('/users', users);
app.use("/chat",chat);

/**
 * socketIo使用
 * @param  {[type]} server [description]
 * @return {[type]}        [description]
 */
app.socketReady=function(server){
  chat.startSocke(server);
};


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
