var request = require('request');

var topStories = [];

//set headers
var headers = {
  'User-Agent': 'Hacker Feed',
  'Conontent-Type': 'application/json'  
};

module.exports = {
  getTopStories: function(callback) {
    if (topStories.length) {
      callback(null,topStories);
    } else {
      callback(new Error('Top Stories not cached!'));
    }
  },

  updateTopStories: function() {
    var storyOrderUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';

    //configure request
    var options = { url: storyOrderUrl, method: 'GET', headers: headers,};
    
    //perform request
    request(options, function(error, response, html){
      var data = JSON.parse(response.body);
      var storyOrder = data.slice(0, 30);

      //Generate api url
      var storyUrl = 'http://hn.algolia.com/api/v1/search?hitsPerPage=30&tagFilters=story,(';
      var storyUrlIds = [];
      for(var i = 0; i < storyOrder.length; i++) {
        storyUrlIds.push('story_' + storyOrder[i]);
      }
      storyUrl += storyUrlIds.join(',') + ')';
      options.url = storyUrl;

      request(options, function(error, response, html){
        var data = JSON.parse(response.body);
        
        //reordering the retrieved stories to match the hacker news front page
        //Clear out previous top stories
        var index;
        var indexMap = data.hits.map(function(obj) {
          return obj.objectID;
        });
        topStories.length = 0;
        
        //storyOrder matches hacker news front page. Find data related to the story ID
        //in the incoming response data
        for(var i = 0; i < storyOrder.length; i++) {
            index = indexMap.indexOf(String(storyOrder[i]));
            topStories.push(data.hits[index]);
          }
        console.log("Top Stories Updated");
      });
    });
  }
};
