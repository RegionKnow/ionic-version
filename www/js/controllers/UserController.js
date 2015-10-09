(function() {
	angular.module('regiknow').controller("UserController", UserController);
	UserController.$inject = ['UserFactory', '$state', 'ionicMaterialInk', '$ionicSideMenuDelegate'];
	function UserController(UserFactory, $state, ionicMaterialInk, $ionicSideMenuDelegate){
		var vm = this;
		vm.status = UserFactory.status;

    ionicMaterialInk.displayEffect();

    vm.welcome = true;

            //---------FUNCTIONALITY FOR USERLOGGEDIN----------------------------------------------------------

            if(vm.status) {
              UserFactory.getUserLoggedIn(vm.status._user.id).then(function(res) {
                vm.userLoggedIn = res;
              });
            };

            //---------FUNCTIONALITY FOR USER----------------------------------------------------------

            vm.registerUser = function() {
             UserFactory.registerUser(vm.user).then(function(){
              vm.user = null;
              $state.go("Login");
            });
           };

           vm.loginUser = function() {
             UserFactory.loginUser(vm.user).then(function(res){
              vm.status = UserFactory.status;
              console.log(vm.status);
              vm.user = null;
              $state.go("QuestionsFeed");

            });
           };

           vm.logoutUser = function() {
             UserFactory.logoutUser().then(function(){
              vm.status = "";
              vm.userLoggedIn = "";
              $state.go("myApp");
            });
           };


     //MD Side Nav=======================================================================================================
     vm.toggleLeft = function() {
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
      	vm.questionsFeed = false;
        vm.messages = false;
      };

      vm.trueLogin = function() {
      	vm.userSettings = false;
      	vm.welcome = false;
      	vm.login = true;
      	vm.profile = false;
      	vm.questions = false;
      	vm.questionsFeed = false;
        vm.messages = false;
      };

      vm.trueWelcome = function() {
      	vm.userSettings = false;
      	vm.welcome = true;
      	vm.login = false;
      	vm.profile = false;
      	vm.questions = false;
      	vm.questionsFeed = false;
        vm.messages = false;
      };

      vm.trueProfile = function() {
      	vm.userSettings = false;
      	vm.welcome = false;
      	vm.login = false;
      	vm.profile = true;
      	vm.questions = false;
      	vm.questionsFeed = false;
        vm.messages = false;
      };

      vm.trueQuestions = function() {
      	vm.userSettings = false;
      	vm.welcome = false;
      	vm.login = false;
      	vm.profile = false;
      	vm.questions = true;
      	vm.questionsFeed = false;
        vm.messages = false;
      };

      vm.trueQsFeed = function() {
      	vm.userSettings = false;
      	vm.welcome = false;
      	vm.login = false;
      	vm.profile = false;
      	vm.questions = false;
      	vm.questionsFeed = true;
        vm.messages = false;
      }

      vm.trueMessages = function() {
        vm.userSettings = false;
        vm.welcome = false;
        vm.login = false;
        vm.profile = false;
        vm.questions = false;
        vm.questionsFeed = false;
        vm.messages = true;
      }

      
      // vm.close = function() {
      //   $mdSidenav('left').close()
      //   .then(function() {
      //     $log.debug("close LEFT is done");
      //   });
      // }


    }
  })();
