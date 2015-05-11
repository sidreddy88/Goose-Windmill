var User = require('./userModel.js');

module.exports = {
  //Handles new user account generation
  signup: function(request, response, next) {

    var username = request.body.username;
    var password = request.body.password;
    var following = request.body.following;
  
    var params = {
      username: username,
      password: password,
      following: following
    };

    //First, determine if the username is available
    User.findOne({username: username}, function(err, user) {
      //User already exists, try again!
      if(user) {
        //Figure out a way for the client to redirect to the signup page
        //and inform the user that this username is already in use.
        response.status(400).send('Figure this out Kenny');
      } else {
        //If it is not in use, create the user in the database
        User.prototype.createUser(params, function(err){
          if(!err){
            response.status(200).send("Signed up");
          } else {
            response.status(400).send("Bad data");
          }
        });
      }
    });    
  },

  //Interact with the database to validate username/password combination
  signin: function(request, response, next) {
    var username = request.body.username;
    var password = request.body.password;

    User.prototype.signin(username, password, function(err, results){
      if(!err){
        console.log('Signed in');
        response.status(200).send(results);
      } else {
        console.log('Sign In error');
        response.status(400).send(err);
      }
    })
  },

  //Controller tells the model to update the database when the user adds or 
  //removes users from their following list
  updateFollowing: function(request, response, next) {
    var username = request.body.username;
    var following = request.body.following;

    User.prototype.updateFollowing(username, following, function(err, results){
      if(!err){
        console.log('User following data updated');
        response.status(200).end();
      } else {
        console.log('User following data update ERROR');
        response.status(400).send(err);
      }
    });
  }
};