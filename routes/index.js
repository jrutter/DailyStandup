const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');

router.get('/', function(req, res) {
  res.render('index.ejs', {
    user : req.user // get the user out of session and pass to template
  });
})

router.get('/add', function(req, res) {
    res.render('add.ejs', {
      user : req.user
    });
});

router.get('/features', function(req, res) {
  res.render('features.ejs', {
    user : req.user
  });
})

router.get('/list/:cat', function(req, res) {
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

module.exports = router
