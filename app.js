var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongo = require('mongoose');
var connectMongo = require('connect-mongo');
var debug = require('debug')('sess:app');
var multer = require('multer')
var flash = require('connect-flash');
var passport = require('passport');

var index = require('./routes/index');
var home = require('./routes/home');

var catalog = require('./routes/catalog');
var userManagement = require('./routes/userManagement');
var branchManagement = require('./routes/branchManagement');

var about = require('./routes/about');
var contact = require('./routes/contact');
var chat = require('./routes/chat');


var app = express();

var MongoStore = connectMongo(session);
var sessConnStr = "mongodb://127.0.0.1/project-sessions";
var sessionConnect = mongo.createConnection();
sessionConnect.on('connecting', function() { debug('Connecting to MongoDB: '); });
sessionConnect.on('connected', function() { debug('Connected to MongoDB: '); });
sessionConnect.on('disconnecting', function() { debug('Disconnecting to MongoDB: '); });
sessionConnect.on('disconnected', function() { debug('Disconnected to MongoDB: '); });
sessionConnect.on('reconnected', function() { debug('Reconnected to MongoDB: '); });
sessionConnect.on('error', function(err) { debug('Error to MongoDB: ' + err); });
sessionConnect.on('open', function() { debug('MongoDB open : '); });
sessionConnect.on('close', function() { debug('MongoDB close: '); });
process.on('SIGINT', function() { sessionConnect.close(function() { process.exit(0); }); });
sessionConnect.open(sessConnStr);

var upload = multer({ dest: '.public\images\\' });

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(session({
    name: 'flowerShop.sid',
    secret: "my special secret",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: new MongoStore({ mongooseConnection: sessionConnect }),
    cookie: { maxAge: 900000, httpOnly: true, sameSite: true }
}));
app.use(favicon(path.join(__dirname, 'public/images', 'logo.png')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(flash());
app.use(passport.initialize());

app.use('/', index);
app.use('/home', home);

app.use('/catalog', catalog);
app.use('/userManagement', userManagement);
app.use('/branchManagement', branchManagement);

app.use('/about', about);
app.use('/contact', contact);
app.use('/chat', chat);


app.use('/public', express.static(__dirname + '/public'));
app.use('/stylesheets', express.static(__dirname + '/public/stylesheets'));
app.use('/javascripts', express.static(__dirname + '/public/javascripts'));
app.use('/images', express.static(__dirname + '/public/images'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err); // Important!

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;