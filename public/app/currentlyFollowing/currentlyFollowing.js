angular.module('hack.currentlyFollowing', [])

.controller('CurrentlyFollowingController', function ($scope, $window, Followers) {
  $scope.currentlyFollowing = Followers.following;

  var init = function(){

  };

  $scope.unfollow = function(user){
    Followers.removeFollower(user);
  };

  init();

  return {
  }
});
