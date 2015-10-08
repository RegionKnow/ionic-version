(function(){
	'use strict'
	angular.module('regiknow').controller('VoteController', VoteController);
	VoteController.$inject = ['$state', '$http', '$stateParams', 'UserFactory', 'QuestionFactory'];
	function VoteController($state, $http, $stateParams, UserFactory, QuestionFactory){
		var vm = this; 

		var question_id = $stateParams.id;
		vm.status = UserFactory.status;
		
		findQuestionVote(question_id);


		vm.upVote = function(){	
			$http.post('http://localhost:3000/api/question/upvote/' + question_id + '/' + vm.status._user.id, null).success(function(res){
				console.log(res)
				findQuestionVote(question_id);
			})
		}

		vm.downVote = function(){
			$http.post('http://localhost:3000/api/question/downvote/' + question_id + '/' + vm.status._user.id, null).success(function(res, callback){
				console.log(res)
				findQuestionVote(question_id);
			})
		}

		function findQuestionVote(question_id){
			QuestionFactory.findQuestion(question_id).then(function(res){
				vm.DownvoteColor = '';
				vm.UpvoteColor = '';
				vm.voteNum = res.voteNum;
				vm.upOrdown = res;

				// console.log(vm.upOrdown.downvote.indexOf(vm.status._user.id))
				if(vm.upOrdown.downvote.indexOf(vm.status._user.id) != -1){
					vm.DownvoteColor = 'orange';
				}
				if(vm.upOrdown.upvote.indexOf(vm.status._user.id) != -1){
					vm.UpvoteColor = 'orange';
				}
			})
		}

	}
})();