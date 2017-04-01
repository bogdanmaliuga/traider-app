(function() {
    angular.module('TraiderApp')
        .controller('SignUpController', ['UserService', 'Storage', '$scope', '$state','Notification', function(UserService, Storage, $scope, $state, Notification) {
            $scope.user = {};

            $scope.signup = function() {
                $scope.signupError = null;
                if ($scope.user.confirmPassword !== $scope.user.password) {
                    $scope.signupError = 'Паролі не співпадають';
                    $scope.user.confirmPassword = "";
                    return;
                }
                var request_body = { "username": $scope.user.username, "email": $scope.user.email, "password": $scope.user.password };
                UserService.signup(request_body)
                    .then(function(response) {
                        Notification('Реєстрація пройшла успішно', 'success');
                        setTimeout(function() { $state.go('login'); }, 3000);
                    }, function(error) { $scope.signupError = 'Аккаут під таким ім\'ям користувача вже зараєтровано'; });
            }

        }]);
}());
