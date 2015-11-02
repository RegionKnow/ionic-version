// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('regiknow', ['ionic', 'ionic.service.core', 'ionic.service.push', 'ionic-material', 'ngMaterial', 'ngCordova', 'ion-fab-button'])
.run(function($ionicPlatform) {
  var androidConfig = {
    "senderID": "484030355290",
  }
  $ionicPlatform.ready(function() {

    var push = PushNotification.init({
      "android": {
        "senderID": "484030355290",
        'iconColor': '#fff'
      }
    });

    push.on('registration', function(data) {
        // data.registrationId
        console.log(data.registrationId);
      });

    push.on('notification', function(data) {
      console.log("Notification:");
      console.log(data);
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
      });

    push.on('error', function(e) {
        // e.message
        console.log("Error: " + e);
      });


    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(Config);
Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {
  $stateProvider.state('myApp', {
    url: '/myApp',
    templateUrl: 'templates/myApp.html'
  })
  .state('UserProfile', {
    url: '/userProfile',
    templateUrl: 'templates/userProfile.html'
  })
  .state('EditProfile', {
    url: '/editProfile',
    templateUrl: 'templates/editProfile.html'
  })
  .state('Register', {
    url: '/register',
    templateUrl: 'templates/register.html'
  })
  .state('Login', {
    url: '/login',
    templateUrl: 'templates/login.html'
  })
  .state('QuestionsFeed', {
    url: '/questionsFeed',
    templateUrl: 'templates/questionsFeed.html'
  })
  .state('QuestionDetail', {
    url: '/questionDetail/:id',
    templateUrl: 'templates/questionDetail.html'
  })
  .state('CreateQuestion', {
    url: '/createQuestion',
    templateUrl: 'templates/createQuestion.html'
  })
  .state('Messages', {
    url: '/messaging/:recipient',
    templateUrl: 'templates/messaging.html'
  })
  .state('UserSettings', {
    url: '/userSettings/:id',
    templateUrl: 'templates/userSettings.html'
  }).state('Rank', {
    url: '/rank/:id',
    templateUrl: 'templates/rank.html'
  }).state('Slide', {
    url: '/slide',
    templateUrl: 'templates/slides.html'
  });
  $urlRouterProvider.otherwise('/myApp');
}
