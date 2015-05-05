angular.module('hack.tabs', [])

.controller('TabsController', function ($scope, $window) {
  var hash = $window.location.hash.split('/')[1];
  hash = hash === "" ? 'all' : hash;
  console.log(hash);
  $scope.currentTab = hash;

  $scope.changeTab = function(newTab){
    $scope.currentTab = newTab;
  }
});
