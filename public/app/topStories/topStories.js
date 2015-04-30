angular.module('hack.topStories', [])

.controller('TopStoriesController', function ($scope, Links) {
  angular.extend($scope, Links);
  $scope.stories = {};
  $scope.getData = function() {
    Links.getStoryIds().then(function(data) {
      $scope.stories = data.slice(0, 30);
    })
    .catch(function(error) {
      console.error(error);
    });
    //Add scope.getComments
  };
  $scope.getData();
});


//https://news.ycombinator.com/item?id=
