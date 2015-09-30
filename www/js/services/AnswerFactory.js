(function() {
	"use strict";
	angular.module('regiknow').factory('AnswerFactory', AnswerFactory);
	AnswerFactory.$inject = ['$q', '$http', "$window", "$rootScope"];

	function AnswerFactory($q, $http, $window, $rootScope) {
		var o = {};
		
		o.addAnswer = function(answer){
			var q = $q.defer();
			$http.post('http://localhost:3000/api/answer/', answer).success(function(res){
				q.resolve(res);

			})
			return q.promise;

		}

		return o;
	}
})();