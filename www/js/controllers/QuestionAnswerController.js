(function() {
	angular.module('regiknow').controller("QuestionAnswerController", QuestionAnswerController);
	QuestionAnswerController.$inject = ['$state', 'QuestionFactory', '$stateParams', 'AnswerFactory', '$rootScope'];
	function QuestionAnswerController($state, QuestionFactory, $stateParams, AnswerFactory, $rootScope){
		var vm = this;
		vm.edit = {}

		vm.AnswerObj = {};
		vm.status = $rootScope._user

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
		vm.addAnswer = function(){
			//AnswerObj is the answer for question
			// vm.AnswerObj.answerBody = vm.answer // sets answer
			vm.AnswerObj.user_id = vm.status.id // sets user who submited it
			AnswerFactory.addAnswer(vm.AnswerObj).then(function(res){
				vm.loading = true; // showing loading gif
				vm.AnswerObj = {};  // removes local object answer
				var AnswerId = {};
				AnswerId.id = res._id; // saves id of answer
				var QuestionId = $stateParams.id;
				
				QuestionFactory.addIdRef(AnswerId, QuestionId).then(function(res){ // function to add ref to question
					
					QuestionFactory.findQuestion($stateParams.id).then(function(res){
						vm.question = res;
						vm.loading = false;
					});
				});
			});
		}

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
		
	}
})();