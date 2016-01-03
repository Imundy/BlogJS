var express = require('express');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
ReactHome = React.createFactory(require('../components/ReactHome'));

/* GET home page. */
module.exports = function(app, passport){
	app.get('/', function(req, res, next) {
		var db = req.db;
		var collection = db.get('usercollection');

		collection.find({},{ limit : 2 }, function(e, docs){
			res.render('index.jade', { title: 'Express', 'posts' : docs});
		});
		
	});

	app.get('/posts', function(req, res, next) {
		var offset = req.query.offset != null ? req.query.offset : 0; 
		var limit = req.query.limit != null ? req.query.limit : 2;

		var db = req.db;
		var collection = db.get('usercollection');

		collection.find({},{ limit : limit, skip: offset }, function(e, docs){
			res.send(docs);
		});
	});

	app.get('/magi', isLoggedIn, function(req, res, next) {
		res.render('magi.jade');
	});

	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback', passport.authenticate('google', { successRedirect : '/magi', failureRedirect : '/' }));

}

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		return next();

	res.redirect('/');
};
