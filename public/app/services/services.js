angular.module('hack.services', [])

.factory('Links', function($http, $interval) {
  var personalStories = [];

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

    var url = 'http://hn.algolia.com/api/v1/search?hitsPerPage=500&tagFilters=story,('
    var storyQuery = [];

    for(var i = 0; i < ids.length; i++) {
      storyQuery.push('story_' + ids[i]);
    }
    url += storyQuery.join(',') + ')';

    return $http({
      method: 'GET',
      url: url
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var getPersonalStories = function(usernames){
    var query = 'http://hn.algolia.com/api/v1/search_by_date?hitsPerPage=500&tagFilters=(story,comment),(';
    var userQuery = [];

    for(var i = 0; i < usernames.length; i++){
      userQuery.push('author_' + usernames[i]);
    }

    query += userQuery.join(',') + ')';

    return $http({
      method: 'GET',
      url: query
    })
    .then(function(resp) {
      angular.forEach(resp.data.hits, function(item){
        if(item.title === null){
          item.isComment = true;
        }
      });

      personalStories.splice(0, personalStories.length);
      personalStories.push.apply(personalStories, resp.data.hits);
    });
  };

  return {
    getStoryIds: getStoryIds,
    getStories: getStories,
    getPersonalStories: getPersonalStories,
    personalStories: personalStories
  };
})
.factory('Followers',  function($http, $window) {
  var following = [];

  var addFollower = function(username){
    var localFollowing = localStorageUsers();

    if (!localFollowing.includes(username) && following.indexOf(username) === -1) {
      localFollowing += ',' + username
      $window.localStorage.setItem('hfUsers', localFollowing);
      following.push(username);
    }
  };

  var removeFollower = function(username){
    var localFollowing = localStorageUsers();

    if (localFollowing.includes(username) && following.indexOf(username) > -1) {
      following.splice(following.indexOf(username), 1);

      localFollowing = localFollowing.split(',');
      localFollowing.splice(localFollowing.indexOf(username), 1).join(',');
      $window.localStorage.setItem('hfUsers', localFollowing);
    }
  };

  var localStorageUsers = function(){
    return $window.localStorage.getItem('hfUsers');
  }

  var init = function(){
    if(!localStorageUsers()){
      $window.localStorage.setItem('hfUsers', 'pg');
    }

    var users = localStorageUsers().split(',');

    for(var i = 0; i < users.length; i++){
      following.push(users[i]);
    }
  };

  init();

  return {
    following: following,
    addFollower: addFollower,
    removeFollower: removeFollower
  }
});