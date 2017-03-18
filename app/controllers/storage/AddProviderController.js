(function() {
    angular.module('TraiderApp')
        .controller('AddProviderController', ['$scope', '$state', '$http', 'Notification', function($scope, $state, $http, Notification) {
            var vm = this;


            vm.add = function() {
                var body = {
                    name: vm.name,
                    account: vm.account,
                    address: vm.address,
                    mfo: vm.mfo,
                    telephone: vm.telephone,
                    ipn: vm.ipn,
                    comment: vm.comment
                }

                $http.post('/api/provider', body).then(function(res) {

                    if (res.status == 200) {

                        Notification({ message: res.data }, 'success');
                        $state.go('storage.providers');
                    }

                });
            }



        }]);
}());
