var User = require('./userModel.js');

module.exports = {
  signup: function(request, response, next) {
    console.log('hello world from userController');
    //console.log('REQUEST.BODY: '+JSON.stringify(request.body));
    var username = request.body.username;
    var password = request.body.password;
    var following = request.body.following;
  
    var params = {
      username: username,
      password: password,
      following: following
    };

    User.prototype.createUser(params, function(err, results){
      if(!err){
        response.status(200).send("Signed up");
      } else {
        response.status(400).send("Bad data");
      }
    })
  },

  signin: function(request, response, next) {
    var username = request.body.username;
    var password = request.body.password;

    User.prototype.signin(username, password, function(err, results){
      if(!err){
        console.log('signed in');
        response.status(200).send(results);
      } else {
        console.log('signin error');
        response.status(400).send(err);
      }
    })
  }
}