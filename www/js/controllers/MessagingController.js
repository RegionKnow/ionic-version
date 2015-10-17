(function() {
	'use strict';
	angular.module('regiknow')
	.controller('MessagingController', MessagingController);

	MessagingController.$inject = ['$http', 'ionicMaterialInk', "$stateParams", "$state", "UserFactory"];

	function MessagingController($http, ionicMaterialInk, $stateParams, $state, UserFactory) {
		ionicMaterialInk.displayEffect();
		var vm = this;
		vm.status = UserFactory.status;
		vm.title = 'Messaging';
		vm.button = "Test call button";

		var pusher = new Pusher('92f79ef8623c09c0511e', {
			encrypted: true
		});



		//Setup function/variable associations for controller
		vm.inConversation;
		vm.getConversations = getConversations;
		vm.openConvo = openConvo;
		vm.closeConvo = closeConvo;
		vm.conversations;
		vm.sendMessage = sendMessage;
		vm.getConversations();


    	//Handles if user came from another the navbar or the question detail state
    	if ($stateParams.recipient) {
    		vm.inConversation = true;
    		vm.recipient = $stateParams.recipient;
    		var participants = {
    			participantOne: vm.status._user.id,
    			participantTwo: vm.recipient,
    		};
    		$http.post('https://regiknow.herokuapp.com/api/convo/convo-finder', participants).then(function(successResponse) {
    			vm.convoInFocus = successResponse.data;
    		}, function(errorResponse) {
    			console.log(errorResponse.data);
    		});
    	} else {
    		$stateParams.recipient = "";
    	}



		function getConversations() {
			$http.post('https://regiknow.herokuapp.com/api/convo', {
				userId: vm.status._user.id
			}).then(function(successResponse) {
				if (successResponse.data.conversations.length < 1) {
					vm.title = "No converstions to display";
					successResponse.data;
				} else {
					vm.conversations = successResponse.data.conversations;
				}

			}, function(errorResponse) {

				console.log(errorResponse.data);
			});
		}

		function openConvo(convoIndex) {
			vm.convoInFocus = vm.conversations[convoIndex];
      vm.channel = pusher.subscribe(vm.convoInFocus._id);
      vm.channel.bind('newMessage', function(data) {
        $scope.$apply(function() {
        vm.convoInFocus.messages.push(data.message);
        // angular.element("html, body").animate({ scrollTop: angular.element(document).height() }, 1000);
        });
      });
      vm.inConversation = true;
		}

		function closeConvo() {
			vm.inConversation = false;
			vm.getConversations();
		}


		function sendMessage() {
			$http.post("https://regiknow.herokuapp.com/api/convo/new-message", {
				convoId: vm.convoInFocus._id,
				sender: vm.status._user.username,
				body: vm.newMessage
			}).then(function(successResponse) {
				getOneConvo(participants);
				vm.newMessage = "";

			}, function(errorResponse) {
				console.log(errorResponse.data);
			});
		}


    	//gets one convo with the participants being an object with the properties participantOne and participantTwo
    	function getOneConvo(participants) {
    		console.log(participants, "getOneConvo");
    		$http.post('https://regiknow.herokuapp.com/api/convo/convo-finder', participants).then(function(successResponse) {
    			vm.convoInFocus = successResponse.data;
    		}, function(errorResponse) {
    			console.log(errorResponse.data);
    		});
    	}


    }
})();
