var request = require('request');

//In server memory of Hacker News current top stories
var topStories = [];

//Set headers
var headers = {
  'User-Agent': 'Hacker Feed',
  'Content-Type': 'application/json'  
};

module.exports = {
  //Access function for model data
  getTopStories: function(callback) {
    if (topStories.length) {
      callback(null,topStories);
    } else {
      callback(new Error('Top Stories not cached!'));
    }
  },

  // The top news stories data is retrieved from the Algolia API, however it does not include
  // Hacker News' ranking algorithm. The data retrieved from Algolia is sorted according to the
  // ranking on the firebase API

  updateTopStories: function() {
    var storyOrderUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';

    // Configure API request
    var options = {
      url: storyOrderUrl,
      method: 'GET',
      headers: headers
    };
    
    // Perform the firebase API request
    request(options, function(error, response, html){
      var data = JSON.parse(response.body);
      var storyOrder = data;

      // Generate algolia search API URL
      var storyUrl = 'http://hn.algolia.com/api/v1/search?hitsPerPage=500&tagFilters=story,(';
      var storyUrlIds = [];
      for(var i = 0; i < storyOrder.length; i++) {
        storyUrlIds.push('story_' + storyOrder[i]);
      }
      storyUrl += storyUrlIds.join(',') + ')';
      options.url = storyUrl;

      request(options, function(error, response, html){
        // Reorder the retrieved stories to match the hacker news front page

        var data = JSON.parse(response.body);
        var index;
        var indexMap = data.hits.map(function(obj) {
          return obj.objectID;
        });

        // Clear out previous top stories
        topStories.length = 0;
        
        //storyOrder matches hacker news front page. Find data related to the story ID
        //in the incoming response data
        for(var i = 0; i < storyOrder.length; i++) {
          index = indexMap.indexOf(String(storyOrder[i]));
          var item = data.hits[index];
          if(item){
            topStories.push(data.hits[index]);
          }
        }
        console.log("Top Stories Updated");
      });
    });
  }
};
