angular.module('hack.currentlyFollowing', [])

.controller('CurrentlyFollowingController', function ($scope, $window, Links) {
  $scope.currentlyFollowing = Links.following;

  var init = function(){

  };

  $scope.unfollow = function(user){

  };

  init();

  return {
  }
});
