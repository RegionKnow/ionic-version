(function() {
	'use strict';
	angular.module('regiknow')
	.controller('EditAnswerController', EditAnswerController);

	EditAnswerController.$inject = ['$state', 'QuestionFactory', '$stateParams', 'AnswerFactory', '$rootScope'];

	function EditAnswerController($state, QuestionFactory, $stateParams, AnswerFactory, $rootScope) {
		var vm = this;
		vm.edit = {};

		
	}
})();
