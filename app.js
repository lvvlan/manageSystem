var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");
var router = require('./routes/router');
const artTpl = require("art-template");
const session = require("express-session");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', artTpl.__express);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

//app.use(logger('combined', {stream: logFiles}));

//在控制台输出请求日志 ** 放在静态资源加载后面则不打印静态资源的请求
//app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

/*set session*/
app.use(session({
  name: "sid",
  secret: "manageSystemSessionSecret",
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 //过时时间设置（毫秒）
  }
}));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler  开发环境
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {

    res.status(err.status || 500);
    /*res.render('error', {
      message: err.message,
      error: err
    });*/

    res.send("NOT FOUND!!!");
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
  res.send("NOT FOUND!");
});


module.exports = app;
