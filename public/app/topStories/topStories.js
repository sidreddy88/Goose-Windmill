angular.module('hack.topStories', [])

.controller('TopStoriesController', function ($scope, $window, Links, Followers) {
  angular.extend($scope, Links);
  $scope.stories = Links.topStories;
  $scope.index = 30;

  $scope.currentlyFollowing = Followers.following;

  $scope.getData = function() {
    Links.getTopStories();
  };
  
  $scope.getData();

  $scope.addUser = function(username) {
    Followers.addFollower(username);
  };

});

