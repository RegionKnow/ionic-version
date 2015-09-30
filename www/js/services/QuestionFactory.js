(function() {
	"use strict";
	angular.module('regiknow').factory('QuestionFactory', QuestionFactory);
	QuestionFactory.$inject = ['$q', '$http', "$window", "$rootScope"];

	function QuestionFactory($q, $http, $window, $rootScope) {
		var o = {};

		o.createQuestion = function(question){ // create the question
			var q = $q.defer();
			$http.post('http://localhost:3000/api/question/create', question).success(function(){
				q.resolve();
			})
			return q.promise;
		}

		o.findQuestions = function(){ // find all questions
			var q = $q.defer();
			$http.get('http://localhost:3000/api/question').success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}

		o.findQuestion = function(id){ // function to find indiv question
			var q = $q.defer();
			$http.get('http://localhost:3000/api/question/' + id).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		o.addIdRef = function(Answer_id, id){
			var q = $q.defer();
			$http.post('http://localhost:3000/api/question/create' + id, Answer_id).success(function(res){
				q.resolve();
			})
			return q.promise;
		}
		o.deleteQuestion = function(question_id){
			var q = $q.defer();
			$http.post('http://localhost:3000/api/question/delete/' + question_id, null).success(function(res){
				q.resolve();
			})
			return q.promise;
		}
		o.editQuestion = function(id, edit){
			var q = $q.defer();
			$http.post('http://localhost:3000/api/question/edit/' +  id, edit).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		return o;
	}
})();