angular.module('hack.auth', [])

.controller('AuthController', ["$scope", "$window", "$location", "Auth", "Followers", 
  function ($scope, $window, $location, Auth, Followers) {
  
  $scope.user = {};
  $scope.newUser = {};
  $scope.loggedIn = Auth.isAuth();

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.hack', token);
        $location.path('/');
      })
      .catch(function (error) {
        //redirect to sign in
        console.error(error);
      });
  };

  $scope.signup = function () {
    $scope.newUser.following = Followers.following.join(',');

    Auth.signup($scope.newUser)
      .then(function (token) {
        $window.localStorage.setItem('com.hack', token);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
}]);
