var mongoose = require('mongoose');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

//Simple database of user data. Password is stored as a hash/salt combination.
//The following value is a comma separated value of posters that the user is following.
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hashword: {
    type: String,
    required: true
  },
  following: {
    type: String,
    required: true
  }
});

var User = mongoose.model('users', UserSchema);

//Model generates new users on signup. This function is only called after the controller 
//determines that the username is not taken.
//params: an object that contains a string of the username, plain text string of the password, 
// and a comma separated string of users that the user is following
User.prototype.createUser = function (params, callback){
  //User password is stored as a hash/salt combination
  bcrypt.hash(params.password, null, null, function(err, hash){
    if(hash) {
      var newUser = new User({
        username: params.username,
        hashword: hash,
        following: params.following
      });
      newUser.save(function(err,results){
        //Relay user creation success/failure back to the controller
        callback(err, results);
      });  
    } else {
      //bcrypt.hash error reporting
      callback(err);
    }
  });
};

//Model handles finding the user and password comparison
User.prototype.signin = function (username, password, callback){
  //Find if the user exists
  User.findOne({'username':username},function(err,user){
    //If the user exists, compare hashed passwords
    if(user){
      bcrypt.compare(password, user.hashword, function(err, res) {
        if (res) {
          //If correct, return the list of hacker news posters that the user is following
          callback(null, user.following);  
        } else {
          //If not correct, handle error
          callback('Incorrect password', null);  
        }
      });
    } else {
      //If the user doesn't exist, handle error
      callback('Username not found', null);
    }
  });  
};

//Update database when the user adds or removes users from their following list
//Method operates on the assumption that the .signin has validated the username.
User.prototype.updateFollowing = function (username, following, callback){
  //Find the user in the database
  //Could try to refactor to .findOneAndUpdate or .findOneAndModify
  User.findOne({username: username}, function(err, user) {
    //Modify and save the database
    user.following = following;
    user.save();
    callback(err);
  });
};

module.exports = User;