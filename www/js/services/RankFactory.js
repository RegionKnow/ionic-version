(function() {
	'use strict';
	angular.module('regiknow')
	.factory('RankFactory', RankFactory);

	RankFactory.$inject = ['$http', '$q'];

	function RankFactory($http, $q){
		var o = {}

		o.collectRanks = function(){
			
			var q = $q.defer();

			$http.get('https://regiknow.herokuapp.com/api/getRanks').success(function(){
				q.resolve();
			})
			return q.promise;
		}

		o.getAll = function(){

			var q = $q.defer();

			$http.get('https://regiknow.herokuapp.com/api/rank').success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}

		return o;
	}
})();