(function() {
    angular.module('TraiderApp')
        .controller('NavbarController', ['UserService','AuthService','$scope', '$state', 'Notification', function(UserService,AuthService,$scope, $state, Notification) {
            var vm = this;
            vm.isLog=AuthService.isLoggedIn();
            vm.logout = function() {
                console.log('sds');
                UserService.logout();
                $state.go('login');
                Notification('Успішний вихід', 'success');

            }
        }]);
}());
