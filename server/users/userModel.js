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

User.prototype.createUser = function (params){
  console.log('PARAMS FROM USER.MODEL.SIGNUP'+JSON.stringify(params));
  
  var newUser = new User({
      username: params.username,
      password: params.password,
      following: params.following
    });

  newUser.save();
};

User.prototype.signin = function (username, password, callback){
  //find if user exists
  User.findOne({'username':username},function(err,user){
    //if exists, compare password
    console.log(err, JSON.stringify(user));
    if(user){
      //if correct, return following
      if(user.password === password) {
        callback(null, user.following);
      } else {
        //if not correct, do stuff w/ error
        callback('Incorrect password', null);
      }
    } else {
      //if not correct, do stuff w/ error
      callback('Username not found', null);
    }
  });
}



module.exports = User;