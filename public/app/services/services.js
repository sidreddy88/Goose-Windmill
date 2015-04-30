angular.module('hack.services', [])

.factory('Links', function($http) {
  var getStories = function() {
    return $http({
      method: 'GET',
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return {
    getStories: getStories
  };
})