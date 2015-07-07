var mongoose = require('mongoose'),
    db = mongoose.connection;

mongoose.connect('mongodb://localhost/nodeauth')
//User schema
var UserSchema = mongoose.Schema({
  fname: {
    type: String,
    index: true
  },
  lname: {
    type: String
  },
  password: {
    type: String //just to make sure it works, adding encrypted later..
  },
  name: {
    type: String
  },
  profileimage: {
    type: String
  }
})

var User = module.exports = mongoose.model('User', UserSchema)

module.exports.createUser = function(newUser, callback) {
  newUser.save(callback)
}
