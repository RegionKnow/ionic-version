(function() {
  'use strict';
  angular.module('regiknow')
    .controller('UserSettingsController', UserSettingsController);

  UserSettingsController.$inject = ['$http', '$stateParams', 'UserSettingsFactory', '$rootScope', 'ionicMaterialInk', "UserFactory"];

  function UserSettingsController($http, $stateParams, UserSettingsFactory, $rootScope, ionicMaterialInk, UserFactory) {
    var vm = this;

    ionicMaterialInk.displayEffect();

    vm.status = UserFactory.status; //we are using this instead state Params==================
    var counter = 0;

    console.log("are you getting to UserSettingsController");



    //============FILTERING ON OR OFF FOR QUESTION CATEGORIES==============================
    vm.filterOn = function() {
      UserSettingsFactory.filterOn(vm.status).then(function(res) {
        console.log('filter Question is On');
      })
    }

    vm.filterOff = function() {
      UserSettingsFactory.filterOff(vm.status).then(function(res) {
        console.log('filter Question is Off');
      })
    }

    // vm.filterAlertOn = function(){
    // 	UserSettingsFactory.filterAlertOn(vm.status).then(function(res){
    // 		console.log('filter Question is On');
    // 		vm.getUser(vm.userId)
    // 	})
    // }
    // vm.filterAlertOff = function(){
    // 	UserSettingsFactory.filterAlertOff(vm.status).then(function(res){
    // 		console.log('filter Question is Off');
    // 		vm.getUser(vm.userId)
    // 	})
    // }

    //===============FUNCTIONS to deal with Tags============================================
    getTags();
    vm.tag = "";

    function getTags() {
      UserSettingsFactory.getTags(vm.status).then(function(res) {
        vm.tags = res;
        console.log(vm.tags);
      })
    }

    // vm.showTagInput = function(){
    // 	counter += 1
    // 	vm.showInput = true;
    // 	if(counter % 2 === 0){
    // 		vm.showInput = false;
    // 	}
    // 	console.log(vm.showInput)
    // }

    vm.addTag = function(tag) {
      vm.tagError = false;
      if (tag == "") {
        return
      }
      var split_tag = tag.split('')
      console.log(split_tag)
      for (var k = 0; k < split_tag.length; k++) {
        if (split_tag[k] == ' ') {
          vm.tagError = true;
          return
        }
      }

      vm.tags.push(tag.toLowerCase());
      vm.tag = "";
    }


    vm.deleteTag = function(index) {
      vm.tags.splice(index, 1)
    }

    vm.saveTags = function() {

      UserSettingsFactory.removeTags(vm.status).then(function(res) {
        UserSettingsFactory.addTags(vm.tags, vm.status).then(function(res) {
          console.log('saved tags')
        })
      })
    }

    //================ MAP functions ===================================================

    vm.homeLocation = {};
    vm.currentLocation = {};
    vm.infoWindow = new google.maps.InfoWindow();

    //funciton to get miles=============================================================
    function getMeters(miles) {
      return miles * 1609.344;
    }

    vm.openMap = function() {
      vm.hlError = null;
      vm.successMes = null;
      vm.mapHomeStatus = false;
      vm.distanceSet = angular.copy(vm.distance)
      vm.mapStatus = true;
      UserSettingsFactory.getLocation().then(function(res) { // gets current location

        //Sets up vm.circle with a value so there is no undefined error in the change event listener below
        getCircle(0, 0)

        console.log(res)
        vm.currentLocation.lat = res.location.lat;
        vm.currentLocation.lng = res.location.lng;
        vm.homeLocation.lat = res.location.lat;
        vm.homeLocation.lng = res.location.lng;
        //building map with current location
        vm.map = new google.maps.Map(document.getElementById('map'), {
          center: {
            lat: vm.currentLocation.lat,
            lng: vm.currentLocation.lng
          },
          scrollwheel: true,
          zoom: 11,
        })
        var marker = new google.maps.Marker({
          map: vm.map,
          position: new google.maps.LatLng(vm.currentLocation.lat, vm.currentLocation.lng),
          title: 'Your Current Location',
          draggable: true
        });

        //Makes it so user can just select radius and go instead of needing to drag the pin
        document.getElementById('settingsRadius').addEventListener("change", function() {
          vm.cityCircle.setMap(null);
          console.log(marker.position)
          vm.currentLocation.lat = vm.homeLocation.lat || marker.position.lat();
          vm.currentLocation.lng = vm.homeLocation.lng || marker.position.lng();
          getCircle(vm.currentLocation.lat, vm.currentLocation.lng);
        });

        google.maps.event.addListener(marker, 'dragend', function() {
          if (vm.cityCircle) {
            vm.cityCircle.setMap(null);
          }
          // resets circle
					console.log(this.position.lat(), this.position.lng())
          vm.homeLocation.lat = this.position.lat();
          vm.homeLocation.lng = this.position.lng();

          getCircle(vm.homeLocation.lat, vm.homeLocation.lng);

        });
      })

    }

    function getCircle(Pinlat, Pinlng) {
      vm.cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: vm.map,
        center: {
          lat: Pinlat,
          lng: Pinlng
        },
        radius: getMeters(vm.distance)
      });
    }

		vm.LocSuccess = true;

    vm.submitHomeLocation = function() { // submits location user selects
      vm.mapStatus = false;
			vm.LocSuccess = false;

      //makes sure there is a lat and lng
			//makes sure there is a lat and lng
			if (!vm.homeLocation.lat) {
				vm.hlError = true;
				return;
			}
			if (!vm.homeLocation.lng) {
				vm.hlError = true;
				return;
			}
			if (vm.distance == "Select Radius") {
				vm.hlError = true;
				return;
			}
      getCircle();
      vm.homeLocation.radius = vm.distance
      console.log(vm.homeLocation)
      var id = vm.status._user.id;

      UserSettingsFactory.addHomeLocation(vm.homeLocation, id).then(function(res) {
				vm.LocSuccess = true;
				vm.hlAdded = true;
				vm.successMes = res;
      })
    }

  }
})();
