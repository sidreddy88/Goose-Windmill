module.exports = function(app, express){
  app.use(express.static(__dirname + '/../../public'));
  app.use(express.static(__dirname + '/../../bower_components'));
};