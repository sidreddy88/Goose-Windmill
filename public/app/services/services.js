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

  var getStories = function(ids) { //ids is array of story ids
    return $http({
      method: 'GET',
      url: 'http://hn.algolia.com/api/v1/search?tagFilters=story,(story_9464348'
    })
    .then(function(resp) {

    });
  };

  var getPersonalStories = function(usernames){
    var query = 'http://hn.algolia.com/api/v1/search_by_date?hitsPerPage=500&tagFilters=story,(';
    var userQuery = [];

    for(var i = 0; i < usernames.length; i++){
      userQuery.push('author_' + usernames[i]);
    }

    query += userQuery.join(',');
    query += ')';

    return $http({
      method: 'GET',
      url: query
    })
    .then(function(resp) {
      return resp.data;
    });
  }

  return {
    getStoryIds: getStoryIds,
    getPersonalStories: getPersonalStories
  };


  


});