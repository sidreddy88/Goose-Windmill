angular.module('hack.currentlyFollowing', [])

.controller('CurrentlyFollowingController', function ($scope, Followers) {
  $scope.currentlyFollowing = Followers.following;

  $scope.unfollow = function(user){
    Followers.removeFollower(user);
  };

  $scope.follow = function(user){
    Followers.addFollower(user);
  };
});
