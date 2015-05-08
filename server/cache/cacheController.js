var Cache = require('./cacheModel.js');

module.exports = {
  topStories: function(request, response) {
    Cache.getTopStories(function(err,results){
        if(!err){
          response.status(200).json(results);
        }else{
          response.status(500).send(err);
        }
    });
  }
};

Cache.updateTopStories();
setInterval(Cache.updateTopStories, 120000);