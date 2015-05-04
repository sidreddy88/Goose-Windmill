angular.module('hack.tabs', [])

.controller('TabsController', function ($scope) {
  $scope.currentTab = 'all';

  $scope.changeTab = function(newTab){
    $scope.currentTab = newTab;
  }
});
