angular.module('hack.personal', [])

.controller('PersonalController', function ($scope, $window, Links) {
  $scope.stories = [];

  var init = function(){
    if (!$window.localStorage.getItem('hfUsers')) {
      $window.localStorage.setItem('hfUsers', 'pg');
    }

    $scope.users = $window.localStorage.getItem('hfUsers').split(',');
    fetchUsers();
  };
  
  var fetchUsers = function(){
    var users = $window.localStorage.getItem('hfUsers').split(',');

    Links.getPersonalStories(users).then(function(data){
      $scope.stories = data.hits;
    });
  };
  
  init();
});




  




