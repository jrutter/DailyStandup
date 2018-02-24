var express = require('express');
var router = express.Router();
var gravatar = require('gravatar');

const User = require('../app/models/user');


var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

  router.get('/login', function(req, res) {
      // render the page and pass in any flash data if it exists
      res.render('login.ejs',
      {
        message: req.flash('loginMessage'),
        user : req.user
    });
  });

  // process the login form
  router.post('/login', passport.authenticate('local-login', {
      successRedirect : '/user/profile', // redirect to the secure profile section
      failureRedirect : '/user/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  router.get('/signup', function(req, res) {
      // render the page and pass in any flash data if it exists
      res.render('signup.ejs', {
        message: req.flash('signupMessage'),
        user : req.user // get the user out of session and pass to template
      });
  });

  // process the signup form
  router.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/user/profile', // redirect to the secure profile section
      failureRedirect : '/user/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  router.get('/profile', isAuthenticated, function(req, res) {

      res.render('profile.ejs', {
          user : req.user,
					gravatar: gravatar.url(req.user.local.email)
      });
  });

	router.post('/profile/edit', isAuthenticated, function(req, res) {
		console.log('form', req.body);
		// var myData = new Status(req.body);

		User.findByIdAndUpdate(req.user._id, {
			username: req.body.username,
			team: req.body.team
		}, function(err, user) {
		  if (err) throw err;

		  // we have the updated user returned to us
		  console.log(user);
			res.redirect('/user/profile');
		});



  });

  router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  return router;
}
