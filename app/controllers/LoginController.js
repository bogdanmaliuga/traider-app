(function() {
    angular.module('TraiderApp')
        .controller('LoginController', ['UserService','Storage','$scope','$state','AuthTokenFactory', function(UserService,Storage,$scope,$state,AuthTokenFactory) {
            $scope.user = {};

            $scope.login = function(email, password) {
                $scope.loginError = null;
                var request_body = { "email": email, "password": password };
                UserService.login(request_body)
                    .then(function(response) {
                            AuthTokenFactory.setToken(response.data.token);
                            Storage.save('username', response.data.username);
                            Storage.save('loggedIn', true);
                            $state.go('menu.ingredients');
                        },
                        function(error) { $scope.loginError = "Щось пішло не так!Не правильний email або пароль"; });
            }

        }]);
}());
