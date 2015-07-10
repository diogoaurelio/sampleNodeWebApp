var mongoose = require('mongoose'),
    db = mongoose.connection,
    bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/nodeauth')
//User schema
var UserSchema = mongoose.Schema({
  fname: {
    type: String,
    index: true
  },
  lname: {
    type: String, required: true, bcrypt: true
  },
  email: {
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

module.exports.getUserByEmail = function(email, callback) {
  var query = { email: email }
  User.findOne(query, callback)
  console.log(email)
}

module.exports.getUserById = function(id, callback) {
  User.findOne(id, callback)
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) return callback(err)
    callback(null, isMatch)
  })
}

module.exports.createUser = function(newUser, callback) {
  bcrypt.hash(newUser.password, 10, function(err, hash) {
    if(err) throw err
    //Intercept and change
    newUser.password = hash;
    //Create user
    newUser.save(callback)
  })

}
