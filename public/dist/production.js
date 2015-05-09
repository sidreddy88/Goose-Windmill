angular.module('hack.services', [])

.factory('Links', ["$http", "$interval", "Followers", function($http, $interval, Followers) {
  var personalStories = [];
  var topStories = [];

  var getTopStories = function() {
    var url = '/api/cache/topStories'

    return $http({
      method: 'GET',
      url: url
    })
    .then(function(resp) {
      topStories.splice(0, topStories.length);
      topStories.push.apply(topStories, resp.data);
    });
  };

  var getPersonalStories = function(usernames){
    var query = 'http://hn.algolia.com/api/v1/search_by_date?hitsPerPage=500&tagFilters=(story,comment),(';
    var userQuery = [];

    for(var i = 0; i < usernames.length; i++){
      userQuery.push('author_' + usernames[i]);
    }

    query += userQuery.join(',') + ')';

    return $http({
      method: 'GET',
      url: query
    })
    .then(function(resp) {
      angular.forEach(resp.data.hits, function(item){
        if(item.title === null){
          item.isComment = true;
        }
      });

      personalStories.splice(0, personalStories.length);
      personalStories.push.apply(personalStories, resp.data.hits);
    });
  };

  var init = function(){
    getPersonalStories(Followers.following);
  };

  init();

  return {
    getTopStories: getTopStories,
    getPersonalStories: getPersonalStories,
    personalStories: personalStories,
    topStories: topStories
  };
}])

.factory('Followers',  ["$http", "$window", function($http, $window) {
  var following = [];

  var updateFollowing = function(){
    var user = $window.localStorage.getItem('com.hack');

    if(!!user){
      var data = {
        username: user,
        following: localStorageUsers()
      };

      $http({
        method: 'POST',
        url: '/api/users/updateFollowing',
        data: data
      });
    }
  };

  var addFollower = function(username){
    var localFollowing = localStorageUsers();

    if (!localFollowing.includes(username) && following.indexOf(username) === -1) {
      localFollowing += ',' + username
      $window.localStorage.setItem('hfUsers', localFollowing);
      following.push(username);
    }

    updateFollowing();
  };

  var removeFollower = function(username){
    var localFollowing = localStorageUsers();

    if (localFollowing.includes(username) && following.indexOf(username) > -1) {
      following.splice(following.indexOf(username), 1);

      localFollowing = localFollowing.split(',');
      localFollowing.splice(localFollowing.indexOf(username), 1).join(',');
      $window.localStorage.setItem('hfUsers', localFollowing);
    }

    updateFollowing();
  };

  var localStorageUsers = function(){
    return $window.localStorage.getItem('hfUsers');
  }

  var localToArr = function(){
    if(!localStorageUsers()){
      $window.localStorage.setItem('hfUsers', 'pg');
    }

    var users = localStorageUsers().split(',');

    following.splice(0, following.length);
    following.push.apply(following, users);
  }

  var init = function(){
    localToArr();
  };

  init();

  return {
    following: following,
    addFollower: addFollower,
    removeFollower: removeFollower,
    localToArr: localToArr
  }
}])

.factory('Auth', ["$http", "$location", "$window", function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.hack');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.hack');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
}]);
angular.module('hack.auth', [])

.controller('AuthController', ["$scope", "$window", "$location", "Auth", "Followers", 
  function ($scope, $window, $location, Auth, Followers) {
  
  $scope.user = {};
  $scope.newUser = {};
  $scope.loggedIn = Auth.isAuth();

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (followers) {
        $window.localStorage.setItem('com.hack', $scope.user.username);
        $window.localStorage.setItem('hfUsers', followers)

        Followers.localToArr();

        $scope.loggedIn = true;
        $scope.user = {};
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    $scope.newUser.following = Followers.following.join(',');

    Auth.signup($scope.newUser)
      .then(function (data) {
        $window.localStorage.setItem('com.hack', $scope.newUser.username);

        $scope.loggedIn = true;
        $scope.newUser = {};
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.logout = function () {
    Auth.signout();
    $scope.loggedIn = false;
  }
}]);

angular.module('hack.currentlyFollowing', [])

.controller('CurrentlyFollowingController', ["$scope", "Followers", function ($scope, Followers) {
  $scope.currentlyFollowing = Followers.following;

  $scope.unfollow = function(user){
    Followers.removeFollower(user);
  };

  $scope.follow = function(user){
    Followers.addFollower(user);
    $scope.newFollow = "";
  };
}]);

angular.module('hack.personal', [])

.controller('PersonalController', ["$scope", "$window", "Links", "Followers", function ($scope, $window, Links, Followers) {
  $scope.stories = Links.personalStories;
  $scope.users = Followers.following;
  $scope.index = 30;

  var init = function(){
    fetchUsers();
  };
  
  var fetchUsers = function(){
    Links.getPersonalStories($scope.users);
  };
  
  init();
}]);

angular.module('hack.tabs', [])

.controller('TabsController', ["$scope", "$window", function ($scope, $window) {
  var hash = $window.location.hash.split('/')[1];
  hash = !hash ? 'all' : hash;
  $scope.currentTab = hash;

  $scope.changeTab = function(newTab){
    $scope.currentTab = newTab;
  }
}]);

angular.module('hack.topStories', [])

.controller('TopStoriesController', ["$scope", "$window", "Links", "Followers", function ($scope, $window, Links, Followers) {
  angular.extend($scope, Links);
  $scope.stories = Links.topStories;
  $scope.index = 30;

  $scope.currentlyFollowing = Followers.following;

  $scope.getData = function() {
    Links.getTopStories();
  };
  
  $scope.addUser = function(username) {
    Followers.addFollower(username);
  };

  $scope.getData();
}]);


angular.module('hack', [
  'hack.topStories',
  'hack.personal',
  'hack.currentlyFollowing',
  'hack.services',
  'hack.tabs',
  'hack.auth',
  'ngRoute'
])

.config(["$routeProvider", "$httpProvider", function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/topStories/topStories.html',
      controller: 'TopStoriesController'
    })
    .when('/personal', {
      templateUrl: 'app/personal/personal.html',
      controller: 'PersonalController'
    })
    .otherwise({
      redirectTo: '/'
    });
}])

.filter('fromNow', function(){
  return function(date){
    return humanized_time_span(new Date(date));
  }
})

.filter('htmlsafe', ['$sce', function ($sce) { 
    return function (text) {
        return $sce.trustAsHtml(text);
    };    
}]);

