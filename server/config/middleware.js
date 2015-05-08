var bodyParser = require('body-parser');

module.exports = function(app, express){
  //Static file locations
  app.use(express.static(__dirname + '/../../public'));
  app.use(express.static(__dirname + '/../../bower_components'));

  //Server App middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  //Establish router and inject the router into the routes file
  var userRouter = express.Router();
  require('../users/userRoutes.js')(app, userRouter);
  
  //Establish routes
  app.use('/api/users', userRouter); 
};


