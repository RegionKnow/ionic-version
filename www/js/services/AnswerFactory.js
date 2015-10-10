(function() {
	"use strict";
	angular.module('regiknow').factory('AnswerFactory', AnswerFactory);
	AnswerFactory.$inject = ['$q', '$http', "$window", "$rootScope"];

	function AnswerFactory($q, $http, $window, $rootScope) {
		var o = {};

		o.addAnswer = addAnswer;
		o.findAnswer = findAnswer;
		o.editAnswer = editAnswer;
		o.deleteAnswer = deleteAnswer;

		function addAnswer(answer){
			var q = $q.defer();
			$http.post('http://localhost:3000/api/answer/', answer).success(function(res){
				q.resolve(res);

			})
			return q.promise;
		}

		function findAnswer(id) {
			var q = $q.defer();
			$http.post('http://localhost:3000/api/answer/' + id, null).success(function(res) {
				q.resolve(res);
			})
			return q.promise;
		}

		function editAnswer(answerId, edit) {
			var answerEditData = {answerIdProp:answerId, editProp:edit}
			var q = $q.defer();
			$http.post('http://localhost:3000/api/answer/edit/', answerEditData).success(function(res) {
				console.log(res);
				q.resolve(res);
			})
			return q.promise;
		}

		function deleteAnswer(answer_id) {
			var q = $q.defer();
			console.log('hitting delete in factory')
			$http.post('http://localhost:3000/api/answer/delete/', {
				answerId: answer_id
			}).success(function(res) {
				q.resolve();
			})
			return q.promise;
		}

		return o;
	}
})();