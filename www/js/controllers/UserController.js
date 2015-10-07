(function() {
	angular.module('regiknow').controller("UserController", UserController);
	UserController.$inject = ['UserFactory', '$state', '$rootScope', 'ionicMaterialInk', '$ionicSideMenuDelegate'];
	function UserController(UserFactory, $state, $rootScope, ionicMaterialInk, $ionicSideMenuDelegate){
		var vm = this;
		vm.status = $rootScope._user;
		console.log(vm.status);

		ionicMaterialInk.displayEffect();

		vm.welcome = true;

		//---------FUNCTIONALITY FORa REGISTER & LOGIN USER----------------------------------------------------------

		vm.registerUser = function() {
			UserFactory.registerUser(vm.user).then(function(){
				vm.user = {};
				delete vm.user;
				$state.go("Login");
			});
		};

		vm.loginUser = function() {
			UserFactory.loginUser(vm.user).then(function(){
				vm.status = $rootScope._user;
				vm.user.username = "";
				vm.user.password = "";
				$state.go("QuestionsFeed");

			});
		};

		vm.logoutUser = function() {
			UserFactory.logoutUser().then(function(){
				vm.status = "";
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

      };

      vm.trueLogin = function() {
      	vm.userSettings = false;
      	vm.welcome = false;
      	vm.login = true;
      	vm.profile = false;
      	vm.questions = false;
      	vm.questionsFeed = false;

      };

      vm.trueWelcome = function() {
      	vm.userSettings = false;
      	vm.welcome = true;
      	vm.login = false;
      	vm.profile = false;
      	vm.questions = false;
      	vm.questionsFeed = false;

      };

      vm.trueProfile = function() {
      	vm.userSettings = false;
      	vm.welcome = false;
      	vm.login = false;
      	vm.profile = true;
      	vm.questions = false;
      	vm.questionsFeed = false;
      };

      vm.trueQuestions = function() {
      	vm.userSettings = false;
      	vm.welcome = false;
      	vm.login = false;
      	vm.profile = false;
      	vm.questions = true;
      	vm.questionsFeed = false;
      };

      vm.trueQsFeed = function() {
      	vm.userSettings = false;
      	vm.welcome = false;
      	vm.login = false;
      	vm.profile = false;
      	vm.questions = false;
      	vm.questionsFeed = true;
      }

      
      // vm.close = function() {
      //   $mdSidenav('left').close()
      //   .then(function() {
      //     $log.debug("close LEFT is done");
      //   });
      // }


  }
})();
