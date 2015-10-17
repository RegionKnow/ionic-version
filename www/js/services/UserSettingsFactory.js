(function() {
	'use strict';
	angular.module('regiknow')
	.factory('UserSettingsFactory', UserSettingsFactory);

	UserSettingsFactory.$inject = ['$http', '$q'];

	function UserSettingsFactory($http, $q) {
		var o = {};


		o.getUserInfo = function(id){
			var q = $q.defer();
			$http.get('/api/user/' + id).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}
		
		//============FILTERING ON OR OFF FOR QUESTION CATEGORIES==============================
		o.filterOn = function(id){
			var q = $q.defer();
			$http.post('https://regiknow.herokuapp.com/api/user/filterOn/' + id).success(function(res){
				q.resolve();
			})
			return q.promise;
		}

		o.filterOff = function(id){
			var q = $q.defer();
			$http.post('https://regiknow.herokuapp.com/api/user/filterOff/' + id).success(function(res){
				q.resolve();
			})
			return q.promise;
		}

		o.filterAlertOn = function(id){
			var q = $q.defer();
			$http.post('https://regiknow.herokuapp.com/api/user/filterAlertOn/' + id).success(function(res){
				q.resolve();
			})
			return q.promise;
		}

		o.filterAlertOff = function(id){
			var q = $q.defer();
			$http.post('https://regiknow.herokuapp.com/api/user/filterAlertOff/' + id).success(function(res){
				q.resolve();
			})
			return q.promise;
		}

		//============TAGS FUNCTIONALITY==============================

		o.addTags = function(tags, id){
			console.log(tags, id)
			var q = $q.defer();
			$http.post("https://regiknow.herokuapp.com/api/user/tags/" + id, tags).success(function(res){
				q.resolve();
			})
			return q.promise;
		}
		o.removeTags = function(id){
			var q = $q.defer();
			$http.delete("https://regiknow.herokuapp.com/api/user/tags/" + id).success(function(res){
				q.resolve();
			})
			return q.promise;
		}
		o.getTags = function(id){
			var q = $q.defer();
			$http.get("https://regiknow.herokuapp.com/api/user/tags/" + id).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}

		//============LOCATION FUNCTIONALITY==============================

		o.getLocation = function(){
			var key = 'AIzaSyDEQ3oCFj1hp7uqTeb8YLmXYrgtmQk-KmM'
			var q = $q.defer();
			console.log('in location homefactory')
			$http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=' + key).success(function(res){
				q.resolve(res);

			})
			return q.promise;
		}


		o.searchLocation = function(){
			console.log('trying to get location')
			var q = $q.defer();
			$http.post('https://maps.googleapis.com/maps/api/geocode/?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=' + key, null).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}

		o.addHomeLocation = function(hl, id){
			var q = $q.defer();
			console.log(hl);
			console.log(id);
			$http.post("https://regiknow.herokuapp.com/api/user/location/" + id, hl).success(function(res){
				q.resolve();
				console.log(res);

			})
			return q.promise;
		}
		return o;
	}
})();