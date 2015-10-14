(function() {
	'use strict';
	angular.module('regiknow')
	.controller('CreateQuestionController', CreateQuestionController);

	CreateQuestionController.$inject = ['$state', 'QuestionFactory', '$rootScope', 'ionicMaterialInk', 'UserFactory'];

	function CreateQuestionController($state, QuestionFactory, $rootScope, ionicMaterialInk, UserFactory) {
		var vm = this;
		var counter = 0;

		vm.question = {};
		vm.tag = "";

		ionicMaterialInk.displayEffect();

		vm.status = UserFactory.status; //THIS IS THE USER THAT'S LOGGED IN
		vm.tags = [];

		//=============CREATING & GETTING ALL QUESTIONS WITH ANSWERS=====================================
		vm.getQuestions = function(){
			QuestionFactory.findQuestions(vm.status._user.id).then(function(res){
				vm.allquestions = res;
			});
		};
		vm.getQuestions(); //getting all questions when page loads

		
		vm.createQ = function(){
      vm.question.questionBody = vm.desc; // setting desc to questionbody
      console.log(vm.status._user.id);
      vm.question.user_id = vm.status._user.id;
      // vm.question.tag = vm.tag


      if (!vm.question.lat && !vm.question.lng) {
      	QuestionFactory.getLocation().then(function(res) {
      		console.log(res);
          //setting lng and lat if user has not selected it
          console.log('getting location');

          vm.question.lat = res.location.lat;
          vm.question.lng = res.location.lng;

          // console.log(vm.question)
          // console.log('creating quesiton');
          QuestionFactory.createQuestion(vm.question).then(function(res) {
          	console.log(res);
          	vm.saveTags(res);
            vm.question = {}; // deleting question object
            vm.desc = ''; // deleting question in html
            $state.go('QuestionsFeed');
        })
      })
      } else { //skips api call to find location
      	console.log('skipped getting locaiton');
      	QuestionFactory.createQuestion(vm.question).then(function(res) {
      		console.log(res);
      		vm.saveTags(res);
          vm.question = {}; // deleting question object
          vm.desc = ''; // deleting question in html
          $state.go('QuestionsFeed');
      })

      }

  }


		///Map Search====================================================================
		vm.addQlocaiton = function(){
			vm.mapStatus = true;
			var geocoder = new google.maps.Geocoder();
			var geocoderRequest = {
				address: vm.questionLocation
			};
			geocoder.geocode(geocoderRequest, function(results, status) {
				console.log(results[0]);
				var loc = results[0].geometry.location;
				console.log(loc);
				vm.question.lat = loc.lat();
				vm.question.lng = loc.lng();
				console.log(vm.question);
				vm.map = new google.maps.Map(document.getElementById('map'), {
					center: {
						lat: loc.lat(),
						lng: loc.lng()
					},
					scrollwheel: true,
					zoom: 11,
				})
				var marker = new google.maps.Marker({
					map: vm.map,
					position: new google.maps.LatLng(loc.lat(), loc.lng()),
					title: 'Your Current Location',
					draggable: true
				});
				google.maps.event.addListener(marker, 'dragend', function() {
					if (vm.cityCircle) {
						vm.cityCircle.setMap(null);
					}
					console.log(marker)
					vm.question.lat = marker.position.lat();
					vm.question.lng = marker.position.lng();
					console.log(vm.question);

				});
			});
		}


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