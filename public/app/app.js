angular.module('hack', [
  'hack.stories',
  'hack.comments',
  'hack.services',
  'ngRoute'
])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'public/app/stories/stories.html',
      controller: 'StoriesController'
    })

})

