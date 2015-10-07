(function() {
	'use strict';
	angular.module('regiknow')
	.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['UserFactory', '$state', 'ionicMaterialInk'];

	function ProfileController(UserFactory, $state, ionicMaterialInk) {
		var vm = this;
		vm.status = UserFactory.status;
		console.log(vm.status);

		ionicMaterialInk.displayEffect();
		
	//-------------GET LOGGED IN USER-------------------------

	if(vm.status) {
		UserFactory.getUserLoggedIn(vm.status._user.id).then(function(res) {
			vm.userLoggedIn = res;
		});
	};

	vm.editProfile = function(userEdits) {
		UserFactory.editProfile(vm.status._user.id, userEdits).then(function(res){
		});
	};


	vm.deleteUserProfile = function() {
		UserFactory.deleteUserProfile(vm.status._user.id).then(function(res){
			vm.deleteUserProfile = res;
		});
	};

}
})();