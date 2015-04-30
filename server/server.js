var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

require('./config/middleware.js')(app, express);

app.listen(port); 
console.log("Server running on port: " + port + "/\nCTRL + C to shutdown");