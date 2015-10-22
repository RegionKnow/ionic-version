(function() {
  angular.module('regiknow').controller("ThirdPartyOAuthcontroller", ThirdPartyOAuthcontroller);
  ThirdPartyOAuthcontroller.$inject = ['$cordovaOauth','$http', "$q", "$cordovaDevice", '$ionicPlatform'];

  function ThirdPartyOAuthcontroller($cordovaOauth, $http, $q, $cordovaDevice, $ionicPlatform) {
    var vm = this;

    $ionicPlatform.ready(function () {
    var uuid = $cordovaDevice.getUUID();
    console.log(uuid);

    })
    vm.facebookLogin = function() {
      $cordovaOauth.facebook("755751737864267", ["email"]).then(function(result) {
        console.log(result);
        $http.get("https://graph.facebook.com/me/", {params: {access_token: result.access_token, fields: 'id,email,name'}}).then(function (res) {
          console.log(res);
        }, function (error) {
          console.log(error);
        })
      }, function(error) {
        // error
      });
    }
    vm.googleLogin = function() {
      $cordovaOauth.google("484030355290-9jal1apd50jqrvla3hdi8ml4r25h8n48.apps.googleusercontent.com", ["email"]).then(function(result) {
        console.log(result);
      }, function(error) {
        // error
      });
    }
  }
})();
