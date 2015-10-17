
(function() {
	angular.module('regiknow').controller("QuestionAnswerController", QuestionAnswerController);
	QuestionAnswerController.$inject = ['$state', 'QuestionFactory', '$stateParams', 'AnswerFactory', '$rootScope', 'ionicMaterialInk', 'UserFactory', '$http'];
	function QuestionAnswerController($state, QuestionFactory, $stateParams, AnswerFactory, $rootScope, ionicMaterialInk, UserFactory, $http){
		var vm = this;
		vm.edit = {}

		vm.AnswerObj = {};
		vm.status = UserFactory.status;
		vm.optionsIcon = true;

		ionicMaterialInk.displayEffect();

		//Grabbing individual question from questions feed-----------------------------------
		if(!$stateParams.id){
			alert('no question found');
		} else{
			QuestionFactory.findQuestion($stateParams.id).then(function(res){
				console.log("we're finding a question by stateParams")
				vm.question = res;
			})
		}

		//options for showing edit and delete buttons----------------------------------------------
		vm.showOptions = function(){
			vm.options = true;
		}
		vm.hideOptions = function(){
			vm.options = false;
			vm.showEdit = false;
		}

		// Answer Logic----------------------------------------------------------------------------
		vm.addAnswer = function() {
      	//AnswerObj is the answer for question
      	// vm.AnswerObj.answerBody = vm.answer // sets answer
      vm.AnswerObj.user_id = vm.status._user.id; // sets user who submited it
      vm.AnswerObj.questionId = vm.thisQuesitonId;
      AnswerFactory.addAnswer(vm.AnswerObj).then(function(res) {
          vm.loading = true; // showing loading gif
          vm.AnswerObj = {} // removes local object answer
          var AnswerId = {}
          AnswerId.id = res._id // saves id of answer
          var QuestionId = $stateParams.id

          QuestionFactory.addIdRef(AnswerId, QuestionId).then(function(res) { // function to add ref to question

          	QuestionFactory.findQuestion($stateParams.id).then(function(res) {

          		vm.question = res;

          		vm.loading = false;
          	})
          })
      }
      )
  }


  vm.submitEditAnswer = function(answerId){
  	answerIdString = answerId.answerId;

  	AnswerFactory.editAnswer(answerIdString, vm.answerEdit).then(function(res){
  		console.log(res);

  		vm.loading = false;
  		QuestionFactory.findQuestion($stateParams.id).then(function(res){
  			vm.question = res;
  		});
  		vm.answerEdit = null;
  	})
  }

  		//FOR QUESTION--------------------------------------------------------------------

  		vm.deleteQuestion = function(quesiton_id){
  			QuestionFactory.deleteQuestion(quesiton_id).then(function(res){
  				$state.go('QuestionsFeed')
  			});
  		}

  		vm.editQuestion = function(){
  			vm.showEdit = true;

  		}

  		vm.submitEdit = function(edit){
  			vm.showEdit = false;

  			QuestionFactory.editQuestion($stateParams.id, vm.edit).then(function(res){
  				QuestionFactory.findQuestion($stateParams.id).then(function(res){
  					vm.question = res
  					vm.loading = false;
  					vm.edit = {}
  				});
  			});
  		};

		// VOTING SYSTEM----------------------------------------------------------------

		vm.choseAnswer = function(AnswerId, postedBy){
			console.log('inside choseAnswer')
			if(vm.status._user.id != vm.question.postedBy) return;
			if(vm.question.answered) return;
			QuestionFactory.confirmAnswer(vm.thisQuesitonId, AnswerId).then(function(res){
				findAnswerVote(AnswerId);
			})
		}

		vm.upVoteAnswer = function(answer_id){
			vm.voteError = false;
			$http.post('https://regiknow.herokuapp.com/api/answer/upvote/' + answer_id + '/' + vm.status._user.id, null).success(function(res){
				console.log(res)
				if(res == "You already voted!"){
					vm.voteError = true;
				}
				findAnswerVote(answer_id);
			})
		}

		vm.downVoteAnswer = function(answer_id){
			vm.voteError = false;
			$http.post('https://regiknow.herokuapp.com/api/answer/downvote/' + answer_id + '/' + vm.status._user.id, null).success(function(res){
				if(res == 'You already downvoted!'){
					vm.voteError = true;
				}
				findAnswerVote(answer_id);
			})
		}

	}
})();
