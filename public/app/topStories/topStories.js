angular.module('hack.topStories', [])

.controller('TopStoriesController', function ($scope, $window, Links) {
  angular.extend($scope, Links);
  $scope.storyIds = {};
  $scope.stories = {};
  $scope.getData = function() {
    Links.getStoryIds().then(function(data) {
      $scope.storyIds = data.slice(0, 30);
      Links.getStories($scope.storyIds).then(function(data) {
        $scope.stories = data["hits"];
      }).catch(function(error) {
        console.error(error);
      })
    })
    .catch(function(error) {
      console.error(error);
    });
    //Add scope.getComments
  };
  $scope.getData();
  $window.localStorage.setItem('hfPosts', '');
  $scope.addUser = function(username) {
    Links.addFollower(username);
  };
});


//https://news.ycombinator.com/item?id=

