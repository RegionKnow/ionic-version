(function() {
	'use strict';
	angular.module('regiknow')
	.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['UserFactory', '$state', '$rootScope'];

	function ProfileController(UserFactory, $state, $rootScope) {
		var vm = this;

		
	//-------------GET LOGGED IN USER-------------------------

	if($rootScope._user) {
		console.log($rootScope._user);
		UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res) {
			vm.userLoggedIn = res;
		});
	};

}
})();