var gravatar = require('gravatar');
const User = require('../models/user');



exports.login = function(req, res) {
  res.render('login.ejs',
  {
    message: req.flash('loginMessage'),
    user : req.user
  });
};
