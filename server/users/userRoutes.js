var userController = require('./userController.js');

module.exports = function (app, router) {
  //Router routing to the controller
  router
    .post('/signup', userController.signup)
    .post('/signin', userController.signin)
    .post('/updateFollowing', userController.updateFollowing)
}