angular.module('hack', [
  'hack.topStories',
  'hack.personal',
  'hack.services',
  'ngRoute'
])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/topStories/topStories.html',
      controller: 'TopStoriesController'
    });
});

