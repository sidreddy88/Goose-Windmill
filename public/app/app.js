angular.module('hack', [
  'hack.topStories',
  'hack.personal',
  'hack.currentlyFollowing',
  'hack.services',
  'ngRoute'
])

.config(function($routeProvider, $httpProvider) {
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
});

