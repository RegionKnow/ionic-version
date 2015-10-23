// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('regiknow', ['ionic', 'ionic.service.core', 'ionic.service.push', 'ionic-material', 'ngMaterial', 'ngCordova', 'ion-fab-button'])
  .run(function($ionicPlatform, $cordovaPush, $window, $rootScope) {
    var androidConfig = {
      "senderID": "484030355290",
    }
    $ionicPlatform.ready(function() {

      $cordovaPush.register(androidConfig).then(function(result) {
        // Success
        console.log();
        console.log("Success " + result);
      }, function(err) {
        console.log("Error " +err);

      })

      $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
        switch (notification.event) {
          case 'registered':
            if (notification.regid.length > 0) {
              alert('registration ID = ' + notification.regid);
            }
            break;

          case 'message':
            // this is the actual push notification. its format depends on the data model from the push server
            alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
            break;

          case 'error':
            alert('GCM error = ' + notification.msg);
            break;

          default:
            alert('An unknown GCM event has occurred');
            break;
        }
      });


      // WARNING: dangerous to unregister (results in loss of tokenID)
      // $cordovaPush.unregister(options).then(function(result) {
      //   // Success!
      // }, function(err) {
      //   // Error
      // })





      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      //   var push = new Ionic.Push({
      //       "debug": true,
      //       onNotification: function(notification) {
      //         var payload = notification.payload;
      //         console.log(notification, payload);
      //       },
      //       onRegister: function(data) {
      //         console.log("From onRegister: %s", data.token);
      //       },
      //       "pluginConfig": {
      //         "ios": {
      //           "badge": true,
      //           "sound": true
      //         },
      //         "android": {
      //           "iconColor": "#343434"
      //         }
      //       }
      //   });
      //
      // push.register(function(token) {
      //   console.log("Device token:", token.token);
      // });

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
    });
  $urlRouterProvider.otherwise('/myApp');
}
