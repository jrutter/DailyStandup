// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var statusSchema = mongoose.Schema({
    status          : {
        email: String,
        team: String,
        blocker: String,
        today: String,
        yesterday: String
    }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Status', statusSchema);
