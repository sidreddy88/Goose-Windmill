angular.module('hack.stories', [])

.controller('StoriesController', function ($scope, Links) {
  angular.extend($scope, Links);
  $scope.getData = function() {
    Links.getStories().then(function(data) {
      $scope.stories = data;
    })
    .catch(function(error) {
      console.error(error);
    });
    //Add scope.getComments
  };
  $scope.getData();
});


  
