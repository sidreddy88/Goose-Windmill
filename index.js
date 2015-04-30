var app = require('./server/server.js');
var port = process.env.PORT || 3000;

app.listen(port);

console.log("Server running on port: " + port + "/\nCTRL + C to shutdown");