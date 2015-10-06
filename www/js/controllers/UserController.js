(function() {
	angular.module('regiknow').controller("UserController", UserController);
	UserController.$inject = ['UserFactory', '$state', '$rootScope', 'ionicMaterialInk'];
	function UserController(UserFactory, $state, $rootScope, ionicMaterialInk){
		var vm = this;
		vm.status = $rootScope._user;


		ionicMaterialInk.displayEffect();


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
				$state.go("QuestionsFeed");
			});
		};

		vm.logoutUser = function() {
			UserFactory.logoutUser().then(function(){
				vm.status = "";
				$state.go("myApp");
			});
		};

	}
})();
