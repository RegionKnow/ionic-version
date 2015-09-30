(function() {
	angular.module('regiknow').controller("SideNavController", SideNavController);
	SideNavController.$inject = ['$ionicSideMenuDelegate'];
	function SideNavController($ionicSideMenuDelegate){
		var vm = this;

		vm.toggleLeft = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};
		
	}
})();