var bodyParser = require('body-parser').json();

var data = {};

module.exports = function (app, router) {
  app.use(bodyParser);

  router.post('/signup', function(request, response) {
    console.log('hello world from userRoutes');
    //console.log('REQUEST.BODY: '+JSON.stringify(request.body));
    var username = request.body.username;
    var password = request.body.password;
    data[username] = password;
    console.log("from data object: ", username, data[username]);
    response.end();
  })
  .post('/signin', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if(data[username] === password) {
      console.log("Logging ", username, " in...");
    } else {
      console.log("Username/Password combination not found!");
    }
    response.end();
  })
}