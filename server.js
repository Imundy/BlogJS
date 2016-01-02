// server.js

var express = require('express'),
logger = require('morgan'),
mongo = require('mongodb'),
monk = require('monk'),
db = monk('localhost:27017/BlogJS')
path = require('path'),
app = express(),
port = 4444,
bodyParser = require('body-parser');

app.use(logger('dev'));

// Make sure to include the JSX transpiler
require('node-jsx').install({extension: '.jsx'});

// Include static assets. Not advised for production
app.use(express.static(path.join(__dirname, 'public')));
// Set view path
app.set('views', path.join(__dirname, './app/views'));
// set up ejs for templating. You can use whatever
app.set('view engine', 'jade');

//set up db connection
app.use(function(req,res,next){
    req.db = db;
    next();
});

// Set up Routes for the application
require('./app/routes/index.js')(app);

//Route not found -- Set 404
app.get('*', function(req, res) {
    res.json({
        'route': 'Sorry this page does not exist!'
    });
});

app.use(express.static('public'))

app.listen(port);
console.log('Server is Up and Running at Port : ' + port);