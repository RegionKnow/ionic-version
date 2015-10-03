(function() {
	'use strict';
	angular.module('regiknow')
	.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['UserFactory', '$state', '$rootScope', 'ionicMaterialInk'];

	function ProfileController(UserFactory, $state, $rootScope, ionicMaterialInk) {
		var vm = this;

		ionicMaterialInk.displayEffect();
		
	//-------------GET LOGGED IN USER-------------------------

	if($rootScope._user) {
		UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res) {
			vm.userLoggedIn = res;
		});
	};

}
})();