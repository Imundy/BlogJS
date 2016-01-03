var monk = require('monk');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth');
var db = monk('localhost:27017/BlogJS');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
    	console.log(user);
    	console.log(user.id);
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
		var collection = db.get('authenticatedUserCollection');
        collection.find({ id : id },null, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({

	        clientID        : configAuth.googleAuth.clientID,
	        clientSecret    : configAuth.googleAuth.clientSecret,
	        callbackURL     : configAuth.googleAuth.callbackURL,

	    },
	    function(token, refreshToken, profile, done) {

	        process.nextTick(function() {

	        	var collection = db.get('authenticatedUserCollection');
	        	console.log('finding user');

	            // try to find the user based on their google id
	            collection.findOne({ 'google.id' : profile.id }, null, function(err, user) {
	                if (err)
	                    return done(err);

	                if (user) {
	                	console.log('user found' + user);
	                	debugger;
	                    // if a user is found, log them in
	                    return done(null, user);
	                } else {
	                	console.log('creating user')
	                    // if the user isnt in our database, create a new user
	                    var newUser = {
	                    	'google': {
	                    		'id'    : profile.id,
	                    		'token' : token,
	                    		'name'  : profile.displayName,
	                    		'email' : profile.emails[0].value
	                    	},
	                    	'isAdmin' : false // pull the first email
	                	}

	                    // save the user
	                    collection.insert(newUser, function (err, doc) {
						  if (err) throw err;
						});
	                }
	            });
	        });

	    })
	);
};