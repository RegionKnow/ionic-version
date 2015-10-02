(function() {
  angular.module('regiknow').controller("SideMenuController", SideMenuController);
  SideMenuController.$inject = ['$ionicSideMenuDelegate', '$rootScope', 'UserFactory'];

  function SideMenuController($ionicSideMenuDelegate, $rootScope, UserFactory) {
    var vm = this;
    
    //THIS IS SO WE CAN GET USER ID AND SEND IT TO USERSETTINGS CONTROLLER=======================
    vm.status = UserFactory.status;

    vm.welcome = true;

      //MD Side Nav=======================================================================================================
      vm.toggleLeft = function() {
        console.log("toggle left is running from what you just clicked!")
        $ionicSideMenuDelegate.toggleLeft();
      };


      function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function() {
          $mdSidenav(navID)
          .toggle()
          .then(function() {
            console.log("toggle " + navID + " is done");
          });
        }, 200);
        return debounceFn;
      }

      //FOR STATES TO SHOW AS TITLE=====================================

      vm.trueUserSettings = function() {
        vm.userSettings = true;
        vm.welcome = false;
        vm.login = false;
        vm.profile = false;
        vm.questions = false;
      };

      vm.trueLogin = function() {
        vm.userSettings = false;
        vm.welcome = false;
        vm.login = true;
        vm.profile = false;
        vm.questions = false;
      };

      vm.trueWelcome = function() {
        vm.userSettings = false;
        vm.welcome = true;
        vm.login = false;
        vm.profile = false;
        vm.questions = false;
      };

      vm.trueProfile = function() {
        vm.userSettings = false;
        vm.welcome = false;
        vm.login = false;
        vm.profile = true;
        vm.questions = false;
      };

      vm.trueQuestions = function() {
        vm.userSettings = false;
        vm.welcome = false;
        vm.login = false;
        vm.profile = false;
        vm.questions = true;
      };
      // vm.close = function() {
      //   $mdSidenav('left').close()
      //   .then(function() {
      //     $log.debug("close LEFT is done");
      //   });
      // }



    }
  })();