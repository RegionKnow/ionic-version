// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('regiknow', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if(window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if(window.StatusBar) {
    StatusBar.styleDefault();
  }
});
})

.config(Config);
Config.$inject = ['$stateProvider', '$urlRouterProvider'];
function Config($stateProvider, $urlRouterProvider) {
  $stateProvider.state('myApp',{
    url: '/myApp',
    templateUrl: 'templates/myApp.html'
  })
  .state('UserProfile', {
    url: '/userProfile',
    templateUrl: 'templates/userProfile.html',
    controller: "UserController",
    controllerAs: "vm"
  })
  .state('Register',{
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'UserController',
    controllerAs: 'vm'
  });
  // .state('Login',{
  //   url: '/login',
  //   templateUrl: 'templates/login.html',
  //   controller: 'NavBarController',
  //   controllerAs: 'nav'
  // }).state('QuestionsFeed',{
  //   url: '/questionsFeed',
  //   templateUrl: 'templates/questionsFeed.html'
  // })
  // .state('updateProfile',{
  //   url: '/updateProfile',
  //   templateUrl: 'templates/updateProfile.html'
  // })
  // .state('CreateQuestion',{
  //   url: '/createQ',
  //   templateUrl: 'templates/CreateQuestion.html',
  //   controller: 'CreateQuestionController',
  //   controllerAs: 'vm'
  // }).state('UserProfile',{
  //   url: '/UserProfile',
  //   templateUrl: 'templates/userProfile.html',
  //   controller: 'UserProfileController',
  //   controllerAs: 'vm'
// });
$urlRouterProvider.otherwise('/myApp');
}

