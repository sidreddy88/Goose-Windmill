var User = require('./userModel.js');

var data = {};

module.exports = {
  signup: function(request, response, next) {
    console.log('hello world from userController');
    //console.log('REQUEST.BODY: '+JSON.stringify(request.body));
    var username = request.body.username;
    var password = request.body.password;
    var following = request.body.following;
    data[username] = password;
    console.log("from data object: ", username, data[username]);
    var params = {
      username: username,
      password: password,
      following: following
    };

    User.prototype.signup(params, function(err, results){
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
    if(data[username] === password) {
      console.log("Logging ", username, " in...");
    } else {
      console.log("Username/Password combination not found!");
    }
    response.end();
  }
}