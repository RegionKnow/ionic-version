(function() {
	angular.module('regiknow').controller("UserController", UserController);
	UserController.$inject = ['UserFactory', '$state', '$rootScope'];
	function UserController(UserFactory, $state, $rootScope){
		var vm = this;
		vm.status = $rootScope._user;

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
				delete vm.status;
			});
		};

	}
})();
