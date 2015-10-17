(function() {
	"use strict";
	angular.module('regiknow').factory('UserFactory', UserFactory);
	UserFactory.$inject = ['$q', '$http', "$window"];

	function UserFactory($q, $http, $window) {
		var o = {};
		o.status = {};
		o.status._user = isLoggedIn();
		//---------------------TOKENS----------------------------------------------------

		o.setLoggedinUserToRootScope = function() {
			o.status._user = isLoggedIn();
		}

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
		//---------------------LOGIN, REGISTER, LOGOUT, EDITUSERNAME----------------------------------------------------

		o.registerUser = function(user) {
			var q = $q.defer();
			console.log(user);
			$http.post('https://regiknow.herokuapp.com/api/user/register', user).success(function(res) {
				// o.status.isLoggedIn = true;
				// o.status.username = user.username;
				q.resolve();
			});
			return q.promise;
		};

		o.loginUser = function(user) {
			var q = $q.defer();
			user.username = user.username.toLowerCase();
			$http.post('https://regiknow.herokuapp.com/api/user/login', user).success(function(res) {
				setToken(res.token);
				o.status._user = isLoggedIn();
				console.log(o.status._user)

				q.resolve();
			});
			return q.promise;
		};

		o.editProfile = function(userId, userEdits) {
			console.log(userEdits);
			console.log(userId);
			var q = $q.defer();
			$http.post('https://regiknow.herokuapp.com/api/user/' + userId, userEdits).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		}



		o.logoutUser = function() {
			var q = $q.defer()
			removeToken();
			o.status._user = isLoggedIn();
			q.resolve();
			return q.promise;
		};

		//-----------GET USER LOGGED IN-----------------------------------------------------------

		o.getUserLoggedIn = function(userId){
			var q = $q.defer();
			$http.get('https://regiknow.herokuapp.com/api/user/' + userId).success(function(res){
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


		o.status._user = isLoggedIn();
		return o;
	}
})();
