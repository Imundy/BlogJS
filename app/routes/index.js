var express = require('express');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
ReactHome = React.createFactory(require('../components/ReactHome'));

/* GET home page. */
module.exports = function(app){
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
			//res.render('blogpostlist.jade', {'posts' : docs});
			res.send(docs);
		});
	});
}
