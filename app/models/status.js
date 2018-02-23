// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var statusSchema = mongoose.Schema({
        email: String,
        team: String,
        blocker: String,
        today: String,
        yesterday: String,
        created_at: Date,
        updated_at: Date
});

// on every save, add the date
statusSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Status', statusSchema);
