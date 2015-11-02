(function(){
	'use strict'
	angular.module('regiknow').controller('SlidesController', SlidesController);
	SlidesController.$inject = ['$scope', '$ionicSlideBoxDelegate'];

	function SlidesController($scope, $ionicSlideBoxDelegate){

		// var vm = this;
		$scope.navSlide = function(slide) {
			$ionicSlideBoxDelegate.slide(slide, 500);
		}

	}

})();