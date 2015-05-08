angular.module('hack.services', [])

.factory('Links', function($http, $interval, Followers) {
  var personalStories = [];
  var topStories = [];

  var getTopStories = function() {
    var url = '/api/cache/topStories'

    return $http({
      method: 'GET',
      url: url
    })
    .then(function(resp) {
      topStories.splice(0, topStories.length);
      topStories.push.apply(topStories, resp.data);
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

  var init = function(){
    getPersonalStories(Followers.following);

    $interval(function(){
      getPersonalStories(Followers.following);
      getTopStories();
      console.log('hi kenny');
    }, 120000);
  };

  init();

  return {
    getTopStories: getTopStories,
    getPersonalStories: getPersonalStories,
    personalStories: personalStories,
    topStories: topStories
  };
})

.factory('Followers',  function($http, $window) {
  var following = [];

  var updateFollowing = function(){
    var user = $window.localStorage.getItem('com.hack');

    if(!!user){
      var data = {
        username: user,
        following: localStorageUsers()
      };

      $http({
        method: 'POST',
        url: '/api/users/updateFollowing',
        data: data
      });
    }
  };

  var addFollower = function(username){
    var localFollowing = localStorageUsers();

    if (!localFollowing.includes(username) && following.indexOf(username) === -1) {
      localFollowing += ',' + username
      $window.localStorage.setItem('hfUsers', localFollowing);
      following.push(username);
    }

    updateFollowing();
  };

  var removeFollower = function(username){
    var localFollowing = localStorageUsers();

    if (localFollowing.includes(username) && following.indexOf(username) > -1) {
      following.splice(following.indexOf(username), 1);

      localFollowing = localFollowing.split(',');
      localFollowing.splice(localFollowing.indexOf(username), 1).join(',');
      $window.localStorage.setItem('hfUsers', localFollowing);
    }

    updateFollowing();
  };

  var localStorageUsers = function(){
    return $window.localStorage.getItem('hfUsers');
  }

  var localToArr = function(){
    if(!localStorageUsers()){
      $window.localStorage.setItem('hfUsers', 'pg,sama');
    }

    var users = localStorageUsers().split(',');

    following.splice(0, following.length);
    following.push.apply(following, users);
  }

  var init = function(){
    localToArr();
  };

  init();

  return {
    following: following,
    addFollower: addFollower,
    removeFollower: removeFollower,
    localToArr: localToArr
  }
})

.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.hack');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.hack');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});