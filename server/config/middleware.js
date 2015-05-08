module.exports = function(app, express){
  app.use(express.static(__dirname + '/../../public'));
  app.use(express.static(__dirname + '/../../bower_components'));

  var userRouter = express.Router();
  require('../users/userRoutes.js')(app, userRouter);
  
  app.use('/api/users', userRouter); 
};

