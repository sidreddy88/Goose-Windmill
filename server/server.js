var express  = require('express');
var mongoose = require('mongoose');

var app = express();

// ------  Connection to mongoose database -----
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/hfPersonal';

mongoose.connect(uristring, {}, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

require('./config/middleware.js')(app, express);

// app.listen(3000, function(){
//   console.log("Listening on 3000");
// });

module.exports = app;