(function() {
	"use strict";
	angular.module('regiknow').factory('UserFactory', UserFactory);
	UserFactory.$inject = ['$q', '$http', "$window", "$rootScope"];

	function UserFactory($q, $http, $window, $rootScope) {
		var o = {};

		//---------------------TOKENS----------------------------------------------------

		function setToken(token) {
			localStorage.setItem("token", token);
		}

		function removeToken() {
			localStorage.removeItem("token");
		}

		function getToken() {
			return localStorage.token;
		}

		function isLoggedIn() {
			var token = getToken();
			if(token) {
				var payload = JSON.parse(urlBase64Decoder(token.split(".")[1]));
				if(payload.exp > Date.now() / 1000) {
					return payload;
				}
			} else {
				return false;
			}
		}
		//---------------------LOGIN, REGISTER, LOGOUT----------------------------------------------------

		o.registerUser = function(user) {
			var q = $q.defer();
			console.log(user);
			$http.post('http://localhost:3000/api/user/register', user).success(function(res) {
				// o.status.isLoggedIn = true;
				// o.status.username = user.username;
				q.resolve();
			});
			return q.promise;
		};

		o.loginUser = function(user) {
			var q = $q.defer();
			user.username = user.username.toLowerCase();
			$http.post('http://localhost:3000/api/user/login', user).success(function(res) {
				setToken(res.token);
				$rootScope._user = isLoggedIn();
				console.log($rootScope._user)
				q.resolve();
			});
			return q.promise;
		};

		o.logoutUser = function(){
			var q = $q.defer()
			removeToken();
			$rootScope._user = isLoggedIn();
			q.resolve();
			return q.promise;
		};

		//-----------GET USER LOGGED IN-----------------------------------------------------------

		o.getUserLoggedIn = function(userId){
			console.log(userId);
			var q = $q.defer();
			$http.get('http://localhost:3000/api/user/' + userId).success(function(res){
				q.resolve(res);
			});
			return q.promise;
		}


		function urlBase64Decoder(str) {
			var output = str.replace(/-/g, '+').replace(/_/g, '/');
			switch(output.length % 4) {
				case 0:{break; }
				case 2: {output += '=='; break;}
				case 3: {output += '='; break;}
				default:
				throw 'Illegal base64url string'
			}
			return decodeURIComponent(escape($window.atob(output)));
		}


		$rootScope._user = isLoggedIn();
		return o;
	}
})();