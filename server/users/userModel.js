var mongoose = require('mongoose');
var Promise = require('bluebird');

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
  salt: String, 
  following: {
    type: String,
    required: true
  }
});

var User = mongoose.model('users', UserSchema);

User.prototype.signup = function (params, callback){
  console.log('PARAMS FROM USER.MODEL.SIGNUP'+JSON.stringify(params));
  
  var newUser = new User({
      username: params.username,
      password: params.password,
      following: params.following
    });

  newUser.save();
}



module.exports = User;