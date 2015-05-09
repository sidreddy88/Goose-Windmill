// HOW OUR FOLLOWING SYSTEM WORKS:
// We want users to be able to follow people before they even
// log in, because who actually has time to decide on a username/password?

// So, we do this by saving the users that they follow into localStorage.
// On signup, we'll send the users string in localStorage to our server
// which wil save them to a database.

angular.module('hack.followService', [])

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

    // makes call to database to mirror our changes
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

    // makes call to database to mirror our changes
    updateFollowing();
  };

  var localStorageUsers = function(){
    return $window.localStorage.getItem('hfUsers');
  }


  // this function takes the csv in localStorage and turns it into an array.
  // There are pointers pointing to the 'following' array. The 'following' array
  // is how our controllers listen for changes and dynamically update the DOM.
  // (because you can't listen to localStorage changes)
  var localToArr = function(){
    if(!localStorageUsers()){
      // If the person is a new visitor, set pg and sama as the default
      // people to follow. Kinda like Tom on MySpace. Except less creepy.
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
