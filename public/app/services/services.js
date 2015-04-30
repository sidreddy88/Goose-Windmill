angular.module('hack.services', [])

.factory('Links', function($http) {
  var getStoryIds = function() {
    return $http({
      method: 'GET',
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  // var getStories = function(ids) { //ids is array of story ids
    
  //   return $http({
  //     method: 'GET',
  //     url: 'http://hn.algolia.com/api/v1/search?tagFilters=story,(story_9464348'
  //   })
  //   .then(function(resp) {

  //   });
  // };

  return {
    getStoryIds: getStoryIds

  };


  


});