var cacheController = require('./cacheController');

module.exports = function (app, router) {
  
  router
    .get('/topStories', cacheController.topStories);

};