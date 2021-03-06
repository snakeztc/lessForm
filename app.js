var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');
var index = require('./routes/index');
var flash = require('express-flash');
var useragent = require('express-useragent');
// mongoDB related
var monk = require('monk');
var db = monk('localhost:27017/duolingo');
var app = express();

// Begin Server
/* Kermit HTTPS setup
app.set('port', process.env.PORT || 5000);
var fs = require('fs');
var options = {
        key: fs.readFileSync('/etc/ssl/localcerts/dialrc.org.key'),
        cert: fs.readFileSync('/etc/ssl/localcerts/dialrc_org_cert.cer')
};
server = require('https').createServer(options, app);
server.listen(app.get('port'), function() {
        console.log('Server listening on port ' + app.get('port'));
});
*/
var server = http.createServer(app);
app.set('port',5000);
server.listen(app.get('port'), function(){
  console.log('Server Listening to ' + app.get('port'));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookie: { maxAge: 60000 }, 
  resave: true, 
  saveUninitialized: true, 
  secret: 'secret' 
}));
app.use(flash());
app.use(useragent.express());

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// show general pages
app.get('/page', index.page);
// default page
app.get('/:uid?', index.home);
// handle submit buttons
app.post('/:uid?', index.home_post_handler);


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
