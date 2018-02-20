// app/routes.js

// import axios from 'axios'


module.exports = function(app, passport, axios, moment) {

    app.get('/', function(req, res) {
        res.render('index.ejs', {
          user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/features', function(req, res) {
        res.render('features.ejs', {
          user : req.user
        });
    });

    app.get('/add', function(req, res) {
        res.render('add.ejs', {
          user : req.user
        });
    });

    app.get('/list/:cat', function(req, res) {
        const data = require('../data.json');
        const models = data.models;

        let searchQ = {}
        let teamQuery = req.params.cat;


        if (teamQuery === 'team') {
          searchQ = {'team': 'onerutter'}
        } else if (teamQuery === 'user' && req.user) {
          searchQ = {'email': req.user.local.email}
        }
        else {
          searchQ = {}
        }

        axios.get('https://api.mlab.com/api/1/databases/standup/collections/stash',
        {
          params: {
            apiKey: 'lAsBHd1474tcG5UNO_KlBFCb5nUWEtt-',
            q: searchQ
          }
        }).then(function (response) {
          res.render('list.ejs',
          {
            data: response.data,
            user : req.user,
            moment: moment
          });
        }).catch(function (error) {
        })

    });


    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs',
        {
          message: req.flash('loginMessage'),
          user : req.user
      });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {
          message: req.flash('signupMessage'),
          user : req.user // get the user out of session and pass to template
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
