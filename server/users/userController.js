var data = {};

module.exports = {
  signup: function(request, response, next) {
    console.log('hello world from userController');
    //console.log('REQUEST.BODY: '+JSON.stringify(request.body));
    var username = request.body.username;
    var password = request.body.password;
    data[username] = password;
    console.log("from data object: ", username, data[username]);
    response.status(200).send("Signed up");
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