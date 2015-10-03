(function() {
	'use strict';
	angular.module('regiknow')
	.controller('CreateQuestionController', CreateQuestionController);

	CreateQuestionController.$inject = ['$state', 'QuestionFactory', '$rootScope', 'ionicMaterialInk'];

	function CreateQuestionController($state, QuestionFactory, $rootScope, ionicMaterialInk) {
		var vm = this;
		var counter = 0;

		vm.question = {};
		vm.tag = "";

		ionicMaterialInk.displayEffect();

		vm.status = $rootScope._user //THIS IS THE USER THAT'S LOGGED IN
		vm.tags = [];

		//=============CREATING & GETTING ALL QUESTIONS WITH ANSWERS=====================================
		vm.getQuestions = function(){
			QuestionFactory.findQuestions(vm.status.id).then(function(res){
				vm.allquestions = res;
			});
		};
		vm.getQuestions(); //getting all questions when page loads

		vm.createQ = function(){
			vm.question.questionBody = vm.desc; // setting desc to questionbody
			console.log(vm.question.questionBody)
			vm.question.user_id = vm.status.id;

			QuestionFactory.createQuestion(vm.question).then(function(res){
				delete vm.question // deleting question object
				delete vm.desc // deleting question in html
				$state.go('QuestionsFeed')
			});
		};

		//=============TAGS FUNCTIONALITY=====================================
		
		vm.addTag = function(tag){
			console.log(tag);
			vm.tagError = false;
			if(tag == ""){
				return 
			}
			var split_tag = tag.split('')
			console.log(split_tag)
			for(var k= 0; k< split_tag.length; k++){
				if(split_tag[k] == ' '){
					vm.tagError = true;
					return
				}
			}
			vm.tags.push(tag.toLowerCase());
			vm.tag = ""
		}
		vm.deleteTag = function(index){
			vm.tags.splice(index, 1)
		}

		vm.saveTags = function(question_id){
			QuestionFactory.addTags(vm.tags, question_id).then(function(res){
				console.log('saved tags')
			})		
		}


	}
})();