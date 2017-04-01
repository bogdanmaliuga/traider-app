(function() {
    angular.module('TraiderApp')
        .service('Storage', function($window) {
            var store = $window.localStorage;
            return {
                getUsername: getUsername,
                setUsername: setUsername,
                remove: remove,
                save: save
            };

            function getUsername() {
                return store.getItem('username');
            }

            function setUsername(username) {
                return store.setItem('username', username);
            }

            function remove(key) {
                return store.removeItem(key);
            }

            function save(key, value) {
                return store.setItem(key, value);
            }

        })
        .service('AuthService', function($window) {
            return {
                isLoggedIn: isLoggedIn
            };

            function isLoggedIn() {
                if ($window.localStorage.getItem('loggedIn')) {
                    return true;
                } else {
                    console.log("User is not logged in");
                    return false;
                }
            }
        })
        .service('UserService', function($http, CONSTANT, Storage) {

            this.signup = function(user) {
                return $http.post(CONSTANT.API_URL + '/signup', user, { headers: { 'Content-Type': 'application/json' } });
            };

            this.login = function(user) {
                return $http.post(CONSTANT.API_URL + '/login', user, { headers: { 'Content-Type': 'application/json' } });
            };

            this.logout = function() {
                Storage.remove('auth-token');
                Storage.remove('username');
                Storage.remove('loggedIn');
            };
        })
        .factory('AuthTokenFactory', function AuthTokenFactory($window) {
            'use strict';
            var store = $window.localStorage;
            var key = 'auth-token';

            return {
                getToken: getToken,
                setToken: setToken
            };

            function getToken() {
                return store.getItem(key);
            }

            function setToken(token) {
                if (token) {
                    store.setItem(key, token);
                } else {
                    store.removeItem(key);
                }
            }
        })
        .factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory) {
            'use strict';
            return {
                request: addToken
            };

            function addToken(config) {
                var token = AuthTokenFactory.getToken();
                if (token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            }
        });



}());
