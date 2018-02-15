var express = require('express')
  , router = express.Router()


router.get('/login', function(req, res) {
      // render the page and pass in any flash data if it exists
      res.render('login.ejs', { message: req.flash('loginMessage') });
});


module.exports = router
