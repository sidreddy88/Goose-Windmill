angular.module('hack.topStories', [])

.controller('TopStoriesController', function ($scope, $window, Links, Followers) {
  angular.extend($scope, Links);
  $scope.storyIds = {};
  $scope.stories = {};
  $scope.getData = function() {
    Links.getStoryIds().then(function(data) {
      $scope.storyIds = data.slice(0, 30);
      Links.getStories($scope.storyIds).then(function(data) {
        $scope.stories = [];
        var index;
        var indexMap = data.hits.map(function(obj) {
          return obj.objectID;
        });

        //Map stories data according to storyIds sort
        for(var i = 0; i < $scope.storyIds.length; i++) {
          index = indexMap.indexOf(String($scope.storyIds[i]));
          var item = data.hits[index];
          
          if(item){
            $scope.stories.push(data.hits[index]);
          }
        }
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
    Followers.addFollower(username);
  };

});


//https://news.ycombinator.com/item?id=

