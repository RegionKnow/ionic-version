(function() {
	'use strict';
	angular.module('regiknow')
	.controller('MessagingController', MessagingController);

	MessagingController.$inject = ['$http'];

	function MessagingController($http) {
		var vm = this;

		vm.title = 'Messaging - RegionKnow';
		vm.button = "Test call button";
		vm.testRequest = function () {
			$http.get('http://localhost:3000/api/convo/').success(function (res) {
				vm.testMessage = res.body;
			});
		};

	}
})();