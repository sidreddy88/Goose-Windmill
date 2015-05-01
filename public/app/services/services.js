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

    var url = 'http://hn.algolia.com/api/v1/search?tagFilters=story,('
    for(var i = 0; i < ids.length;i++) {
      url +='story_'+ids[i]+',';
    }
    url +=')';
    return $http({
      method: 'GET',
      url: url
    })
    .then(function(resp) {
      return resp.data;
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
    getStories: getStories,
    getPersonalStories: getPersonalStories
  };


  


});