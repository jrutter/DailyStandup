var express = require('express')
  , router = express.Router()

// router.use('/animals', require('./animals'))
router.use('/user', require('./user'))

router.get('/', function(req, res) {
  res.render('index.ejs', {
    user : req.user // get the user out of session and pass to template
  });
})

router.get('/features', function(req, res) {
  res.render('features.ejs', {
    user : req.user
  });
})

module.exports = router
